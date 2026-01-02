import db from '../../models/index.js';

export const getAllTenantsService = async () => {
  return await db.Tenant.findAll({
    order: [['id', 'ASC']],
  });
};

export const createTenantService = async ({ firstname, lastname, idnumber, email, phone, propertyid, leasestarts, leaseends }) => {
  const existing = await db.Tenant.findOne({
    where: {
      email,
      phone,
      idnumber
    },
  });

  if (existing) {
    throw new Error('Tenant name and model already exists');
  }

  return await db.Tenant.create({ firstname, lastname, idnumber, email, phone, propertyid, leasestarts, leaseends });
};

export const updateTenantService = async (id, data) => {
  const tenant = await db.Tenant.findByPk(id);
  await tenant.update(data);
  return tenant;
};

export const deleteTenantService = async (id) => {
  const tenant = await db.Tenant.findByPk(id);
  if (!tenant) throw new Error('Tenant not found');
  await tenant.destroy(); // ✅ Hard delete
  return tenant;
};