import db from '../../models/index.js';

export const getAllWorkersService = async () => {
  return await db.Worker.findAll({
    order: [['id', 'ASC']],
  });
};

export const createWorkerService = async ({ firstname, lastname, email, phone, idnumber, role, salary, paymentfrequecy, status }) => {
  const existing = await db.Worker.findOne({
    where: {
      email,
      phone,
      idnumber
    },
  });

  if (existing) {
    throw new Error('Worker already exists');
  }

  return await db.Worker.create({ firstname, lastname, email, phone, idnumber, role, salary, paymentfrequecy, status });
};

export const updateWorkerService = async (id, data) => {
  const worker = await db.Worker.findByPk(id);
  await worker.update(data);
  return worker;
};

export const deleteWorkerService = async (id) => {
  const worker = await db.Worker.findByPk(id);
  if (!worker) throw new Error('Worker not found');
  await worker.destroy(); // ✅ Hard delete
  return worker;
};