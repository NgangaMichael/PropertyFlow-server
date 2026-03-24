import cron from 'node-cron';
import db from '../models/index.js';
import { Op } from 'sequelize';
import { sendEmail } from './emailService.js';
import { generateInvoicePDF } from './pdfGenerator.js';

/**
 * Helper: Checks if the tenant has made any payment 
 * recorded in the database for the current calendar month.
 */
const hasPaidThisMonth = async (tenantId) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const payment = await db.Payment.findOne({
    where: {
      tenantid: tenantId,
      createdAt: { [Op.gte]: startOfMonth }
    }
  });
  return !!payment;
};

// --- THE AUTOMATION SCHEDULE (Runs daily at 8:00 AM) ---
cron.schedule('0 8 * * *', async () => {
    // run every minute fr testing 
// cron.schedule('* * * * *', async () => {
  const today = new Date().getDate();
  const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  
  console.log(`[${new Date().toISOString()}] Starting daily automation check...`);

  try {
    const tenants = await db.Tenant.findAll({ 
      include: [
        { 
          model: db.Property, // Matches db.Property in your index.js
          as: 'property'      // Matches the 'as' in your belongsTo association
        }
      ] 
    });

    for (const tenant of tenants) {
      const property = tenant.property;
      if (!property) continue; // Skip if tenant isn't assigned to a property

      const paid = await hasPaidThisMonth(tenant.id);

      // --- RULE 7: FRAUD ALERT (4th of every month) ---
      // Sent to ALL tenants regardless of payment status
      if (today === 4) {
        await sendEmail({
          to: tenant.email,
          subject: "🛡️ FRAUD ALERT: Verified Payment Accounts",
          html: `
            <div style="font-family: sans-serif; border: 2px solid #e11d48; padding: 15px;">
              <h3 style="color: #e11d48;">SECURITY NOTICE</h3>
              <p>Please note that <b>Grandnum Properties</b> accounts remain the same. 
              Any changes will be communicated via our official office lines only.</p>
              <p><b>Verified Accounts:</b> [Insert Your Account Details]</p>
            </div>`
        });
      }

      // --- RULE 1: MONTHLY INVOICE (Last day of month) ---
      // Sent to ALL tenants for the upcoming month
      if (today === lastDay) {
        const pdfBuffer = await generateInvoicePDF(tenant, property);
        await sendEmail({
          to: tenant.email,
          subject: `Monthly Rent Invoice - ${property.propertyname}`,
          html: `<p>Dear ${tenant.firstname}, please find your rent invoice for the upcoming month attached.</p>`,
          attachments: [{ filename: `Invoice_${tenant.lastname}.pdf`, content: pdfBuffer }]
        });
      }

      // --- DEBT COLLECTION REMINDERS (Only if NO payment found) ---
      if (!paid) {
        let subject = "";
        let message = "";

        if (today === 5) { // RULE 2
          subject = "Rent Reminder: Due Today";
          message = "Your rent is due today. Please make your payment and forward the confirmation.";
        } 
        else if (today === 6) { // RULE 3
          subject = "URGENT: Overdue Rent & Disconnection Notice";
          message = "Your rent is now overdue. A 10% late fee has been applied. Note that utilities will be disconnected on the 11th if unpaid.";
        }
        else if (today === 10) { // RULE 4
          subject = "Payment Reminder";
          message = "This is a friendly nudge to settle your outstanding rent balance.";
        }
        else if (today === 15) { // RULE 5
          subject = "FINAL NOTICE: Scheduled House Closure";
          message = "Notice: Your account is significantly overdue. House closure is scheduled for the 21st if rent remains unpaid.";
        }
        else if (today === lastDay) { // RULE 6
          subject = "AUCTION NOTICE: Final 7 Days";
          message = "You have 7 days to clear your balance, or items will be sold at your own cost to recover arrears.";
        }

        if (subject) {
          await sendEmail({
            to: tenant.email,
            subject,
            html: `<div style="font-family: sans-serif; padding: 10px;">
                    <p>Dear ${tenant.firstname},</p>
                    <p>${message}</p>
                    <p>Regards,<br/><b>Grandnum Properties Management</b></p>
                   </div>`
          });
        }
      }
    }
    console.log(`[${new Date().toISOString()}] Automation check completed successfully.`);
  } catch (error) {
    console.error('[NODE-CRON] [FATAL ERROR]:', error);
  }
});