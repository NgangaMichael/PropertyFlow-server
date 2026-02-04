import { propertyService } from '../../services/index.js';

export const getAllProperties = async (req, res) => {
  const propertys = await propertyService.getAllPropertiesService();
  res.json(propertys);
};

export const createProperty = async (req, res) => {
  // Add landlordid to the destructuring list below
  const { 
    landlordid, 
    propertyname, 
    propertytype, 
    rentamount, 
    depositamount, 
    bedrooms, 
    bathrooms, 
    location, 
    description, 
    housenumber,
    status 
  } = req.body;

  try {
    const property = await propertyService.createPropertyService({
      landlordid, // Pass it to the service
      propertyname, 
      propertytype, 
      rentamount, 
      depositamount, 
      bedrooms, 
      bathrooms, 
      location, 
      description,
      housenumber,
      status
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { propertyname, propertytype, rentamount, depositamount, bedrooms, bathrooms, housenumber, location, description, status } = req.body;

  try {
    const updatedProperty = await propertyService.updatePropertyService(id, {
      propertyname, 
      propertytype, 
      rentamount, 
      depositamount, 
      bedrooms, 
      bathrooms, 
      housenumber,
      location, 
      description, 
      status
    });

    res.json(updatedProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await propertyService.deletePropertyService(id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};