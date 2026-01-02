import db from '../../models/index.js';

export const getAllLandlordsService = async () => {
  return await db.Landlord.findAll({
    order: [['id', 'ASC']],
  });
};

export const createLandlordService = async ({ firstname, lastname, email, phone, idunmber, address, bankname, bankaccountnumber, status }) => {
  const existing = await db.Landlord.findOne({
    where: {
      idunmber,
      email,
    },
  });

  if (existing) {
    throw new Error('Landlord already exists');
  }

  return await db.Landlord.create({ firstname, lastname, email, phone, idunmber, address, bankname, bankaccountnumber, status });
};

export const updateLandlordService = async (id, data) => {
  const landlord = await db.Landlord.findByPk(id);
  await landlord.update(data);
  return landlord;
};

export const deleteLandlordService = async (id) => {
  const landlord = await db.Landlord.findByPk(id);
  if (!landlord) throw new Error('Landlord not found');
  await landlord.destroy(); // ✅ Hard delete
  return landlord;
};