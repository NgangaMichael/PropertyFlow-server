import db from '../../models/index.js';

export const getAllLandlordsService = async () => {
  return await db.Landlord.findAll({
    order: [['id', 'ASC']],
  });
};

export const createLandlordService = async (data) => {
  try {
    return await db.Landlord.create(data);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Extract the field name that caused the conflict
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