import db from '../../models/index.js';
import { generateLandlordPDF } from '../../utils/pdfGenerator.js';
import { sendEmail } from '../../utils/emailService.js';

export const getAllLandlordsService = async () => {
  return await db.Landlord.findAll({
    order: [['id', 'ASC']],
  });
};

export const createLandlordService = async (data) => {
  try {
    // 1. Create the Landlord in DB
    const landlord = await db.Landlord.create(data);

    // 2. Generate the PDF
    const pdfBuffer = await generateLandlordPDF(landlord);

    // 3. Send the Email
    await sendEmail({
      to: landlord.email,
      subject: `Management Agreement - Grandnum Properties & ${landlord.lastname}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #4f46e5;">Partnership Confirmation</h2>
          <p>Dear ${landlord.firstname} ${landlord.lastname},</p>
          <p>We are delighted to welcome you to <b>Grandnum Properties</b>. We have successfully registered you as a property owner in our management system.</p>
          <p>Attached to this email is your <b>Property Management Agreement</b>, which outlines our commission structure of ${landlord.commision}% and our service terms.</p>
          <div style="background-color: #f9fafb; padding: 10px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <p><b>Remittance Account:</b> ${landlord.bankaccountnumber} (${landlord.bankname})</p>
          </div>
          <p>We look forward to a successful partnership.</p>
          <br/>
          <p>Regards,<br/><b>Grandnum Properties Team</b></p>
        </div>
      `,
      attachments: [
        {
          filename: `Management_Agreement_${landlord.lastname}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    return landlord;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      throw new Error(`A landlord with this ${field} already exists.`);
    }
    throw error;
  }
};

export const updateLandlordService = async (id, data) => {
  try {
    const landlord = await db.Landlord.findByPk(id);
    if (!landlord) throw new Error('Landlord not found');
    await landlord.update(data);
    return landlord;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      throw new Error(`The ${field} entered is already taken by another landlord.`);
    }
    throw error;
  }
};

export const deleteLandlordService = async (id) => {
  const landlord = await db.Landlord.findByPk(id);
  if (!landlord) throw new Error('Landlord not found');
  await landlord.destroy(); // ✅ Hard delete
  return landlord;
};