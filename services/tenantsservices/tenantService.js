import db from '../../models/index.js';
import { sendEmail } from '../../utils/emailService.js';
import { generateLeasePDF } from '../../utils/pdfGenerator.js';

export const getAllTenantsService = async () => {
  return await db.Tenant.findAll({
    order: [['id', 'ASC']],
    include: [
      {
        model: db.Property,
        as: 'property', // Matches the alias in the association
        attributes: ['propertyname', 'location'] // Only fetch what you need
      }
    ]
  });
};

export const createTenantService = async (data) => { 
  try {
    const tenant = await db.Tenant.create(data);

    // 2. Fetch Property details for the PDF
    const property = await db.Property.findByPk(data.propertyid);

    // 3. Generate PDF Buffer on the fly
    const pdfBuffer = await generateLeasePDF(tenant, property);

    // 4. Send Email with Attachment
    await sendEmail({
      to: tenant.email,
      subject: `Lease Agreement - ${tenant.firstname} ${tenant.lastname}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #4f46e5;">Welcome to Grandnum Properties!</h2>
          <p>Dear ${tenant.firstname},</p>
          <p>Your tenant profile for <b>${property?.propertyname}</b> has been successfully created.</p>
          <p>Please find your <b>Official Lease Agreement</b> attached to this email for your records.</p>
          <br/>
          <p>Best Regards,<br/>Management Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `Lease_Agreement_${tenant.lastname}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    return tenant;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Identifies which field (email, phone, or idnumber) is the duplicate
      const field = error.errors[0].path;
      throw new Error(`A tenant with this ${field} already exists.`);
    }
    throw error;
  }
};

export const updateTenantService = async (id, data) => {
  try {
    const tenant = await db.Tenant.findByPk(id);
    if (!tenant) throw new Error('Tenant not found');
    await tenant.update(data);
    return tenant;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      throw new Error(`The ${field} provided is already assigned to another tenant.`);
    }
    throw error;
  }
};

export const deleteTenantService = async (id) => {
  const tenant = await db.Tenant.findByPk(id);
  if (!tenant) throw new Error('Tenant not found');
  await tenant.destroy(); // ✅ Hard delete
  return tenant;
};