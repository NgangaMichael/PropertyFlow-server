import { workerService } from '../../services/index.js';

export const getAllWorkers = async (req, res) => {
  const workers = await workerService.getAllWorkersService();
  res.json(workers);
};

export const createWorker = async (req, res) => {
  const { firstname, lastname, email, phone, idnumber, role, salary, paymentfrequecy, status } = req.body;
  console.group(req.body);

  try { 
    const worker = await workerService.createWorkerService({
      firstname, 
      lastname, 
      email, 
      phone, 
      idnumber, 
      role, 
      salary, 
      paymentfrequecy, 
      status
    });

    res.status(201).json(worker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, phone, idnumber, role, salary, paymentfrequecy, status } = req.body;
  console.group(req.body);

  try {
    const updateWorker = await workerService.updateWorkerService(id, {
      firstname, 
      lastname, 
      email, 
      phone, 
      idnumber, 
      role, 
      salary, 
      paymentfrequecy, 
      status
    });

    res.json(updateWorker);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    await workerService.deleteWorkerService(id);
    res.json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};