import { tenantService } from '../../services/index.js';

export const getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantService.getAllTenantsService();
    res.json(tenants);
  } catch (error) {
    console.error('getAllTenants error:', error.message); // shows the real SQL error
    res.status(500).json({ error: error.message });
  }
};

export const createTenant = async (req, res) => {
  const { 
    firstname, lastname, idnumber, kraPin, email, phone, 
    alternativePhone1, alternativePhone2, occupation, 
    maritalStatus, numberOfChildren, isEmployed, 
    employerName, employerAddress, nextOfKinName, 
    nextOfKinId, nextOfKinPhone, propertyid, 
    leasestarts, leaseends 
  } = req.body;

  try {
    const tenant = await tenantService.createTenantService({
      firstname, lastname, idnumber, kraPin, email, phone, 
      alternativePhone1, alternativePhone2, occupation, 
      maritalStatus, numberOfChildren, isEmployed, 
      employerName, employerAddress, nextOfKinName, 
      nextOfKinId, nextOfKinPhone, propertyid, 
      leasestarts, leaseends
    });

    res.status(201).json(tenant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { 
    firstname, lastname, idnumber, kraPin, email, phone, 
    alternativePhone1, alternativePhone2, occupation, 
    maritalStatus, numberOfChildren, isEmployed, 
    employerName, employerAddress, nextOfKinName, 
    nextOfKinId, nextOfKinPhone, propertyid, 
    leasestarts, leaseends 
  } = req.body;

  try {
    const updatedTenant = await tenantService.updateTenantService(id, {
      firstname, lastname, idnumber, kraPin, email, phone, 
      alternativePhone1, alternativePhone2, occupation, 
      maritalStatus, numberOfChildren, isEmployed, 
      employerName, employerAddress, nextOfKinName, 
      nextOfKinId, nextOfKinPhone, propertyid, 
      leasestarts, leaseends
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
    res.json({ message: 'Tenant deleted successfully' }); // Fixed typo from 'Tenants'
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};