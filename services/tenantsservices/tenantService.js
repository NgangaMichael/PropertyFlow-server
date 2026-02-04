import db from '../../models/index.js';

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
    return await db.Tenant.create(data);
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