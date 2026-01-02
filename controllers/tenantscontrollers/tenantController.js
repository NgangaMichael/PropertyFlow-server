import { tenantService } from '../../services/index.js';

export const getAllTenants = async (req, res) => {
  const tenants = await tenantService.getAllTenantsService();
  res.json(tenants);
};

export const createTenant = async (req, res) => {
  const { firstname, lastname, idnumber, email, phone, propertyid, leasestarts, leaseends } = req.body;

  try {
    const tenant = await tenantService.createTenantService({
      firstname, 
      lastname, 
      idnumber, 
      email, 
      phone, 
      propertyid, 
      leasestarts, 
      leaseends
    });

    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, idnumber, email, phone, propertyid, leasestarts, leaseends } = req.body;

  try {
    const updatedTenant = await tenantService.updateTenantService(id, {
      firstname, 
      lastname, 
      idnumber, 
      email, 
      phone, 
      propertyid, 
      leasestarts, 
      leaseends
    });

    res.json(updatedTenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    await tenantService.deleteTenantService(id);
    res.json({ message: 'Tenants deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};