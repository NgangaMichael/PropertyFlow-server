import { landlordService } from '../../services/index.js';

export const getAllLandlords = async (req, res) => {
  const landlords = await landlordService.getAllLandlordsService();
  res.json(landlords);
};

export const createLandlord = async (req, res) => {
  const { firstname, lastname, email, phone, idunmber, address, bankname, bankaccountnumber, status } = req.body;

  try {
    const landlord = await landlordService.createLandlordService({
      firstname, 
      lastname, 
      email, 
      phone, 
      idunmber, 
      address, 
      bankname, 
      bankaccountnumber, 
      status
    });

    res.status(201).json(landlord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateLandlord = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, idunmber, address, bankname, bankaccountnumber, status } = req.body;

  try {
    const updatedLandlord = await landlordService.updateLandlordService(id, {
      firstname, 
      lastname, 
      email, 
      phone, 
      idunmber, 
      address, 
      bankname, 
      bankaccountnumber, 
      status
    });

    res.json(updatedLandlord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteLandlord = async (req, res) => {
  const { id } = req.params;
  try {
    await landlordService.deleteUserService(id);
    res.json({ message: 'Landlord deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};