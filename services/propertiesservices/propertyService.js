import db from '../../models/index.js';

export const getAllPropertiesService = async () => {
  return await db.Property.findAll({
    order: [['id', 'ASC']],
  });
};

export const createPropertyService = async ({ propertyname, propertytype, rentamount, depositamount, bedrooms, bathrooms, location, description, status }) => {
  const existing = await db.Property.findOne({
    where: {
      propertyname,
    },
  });

  if (existing) {
    throw new Error('Property already exists');
  }

  return await db.Property.create({ propertyname, propertytype, rentamount, depositamount, bedrooms, bathrooms, location, description, status });
};

export const updatePropertyService = async (id, data) => {
  const property = await db.Property.findByPk(id);
  await property.update(data);
  return property;
};

export const deletePropertyService = async (id) => {
  const property = await db.Property.findByPk(id);
  if (!property) throw new Error('Property not found');
  await property.destroy(); // ✅ Hard delete
  return property;
};