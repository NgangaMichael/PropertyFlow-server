// services/paymentService.js
import db from '../../models/index.js';
import { generatePaymentReceiptPDF } from '../../utils/pdfGenerator.js';
import { sendEmail } from '../../utils/emailService.js';

export const getAllPaymentsService = async () => {
  return await db.Payment.findAll({
    order: [['id', 'ASC']],
    include: [
      {
        model: db.Tenant,
        as: 'tenant', // Must match the 'as' in the association
        attributes: ['firstname', 'lastname', 'phone'] // Only fetch what you need
      },
      {
        model: db.Property,
        as: 'property',
        attributes: ['propertyname'] 
        // Note: To get 'owner', you might need to include Landlord here too
      }
    ]
  });
};

export const createPaymentService = async ({ tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes }) => {
  try {
    // 1. Save the payment to the database
    const payment = await db.Payment.create({ tenantid, propertyid, amount, paymenttype, paymentmethod, reference, notes });

    // 2. Fetch Tenant and Property info for the email and PDF
    const tenant = await db.Tenant.findByPk(tenantid);
    const property = await db.Property.findByPk(propertyid);

    if (tenant) {
      // 3. Generate Receipt PDF
      const pdfBuffer = await generatePaymentReceiptPDF(payment, tenant, property);

      // 4. Send the Invoice/Receipt Email
      await sendEmail({
        to: tenant.email,
        subject: `Payment Confirmation: ${payment.paymenttype} - ${property?.propertyname}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0;">Payment Received</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #eee;">
              <p>Hello ${tenant.firstname},</p>
              <p>This is to confirm that we have received your payment of <b>KSH ${Number(amount).toLocaleString()}</b>.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Reference:</b></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${reference}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Payment Type:</b></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${paymenttype}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><b>Property:</b></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${property?.propertyname}</td>
                </tr>
              </table>

              <p>Please find your official receipt attached to this email.</p>
              <p>Thank you for being a valued tenant at <b>Grandnum Properties</b>.</p>
              <br/>
              <p>Best regards,<br/><b>Accounts Department</b></p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `Receipt_${reference || payment.id}.pdf`,
            content: pdfBuffer
          }
        ]
      });
    }

    return payment;
  } catch (error) {
    console.error('Payment Service Error:', error);
    throw error;
  }
};

export const updatePaymentService = async (id, data) => {
  const payment = await db.Payment.findByPk(id);
  await payment.update(data);
  return payment;
};

export const deletePaymentService = async (id) => {
  const payment = await db.Payment.findByPk(id);
  if (!payment) throw new Error('Payment not found');
  await payment.destroy(); // ✅ Hard delete
  return payment;
};