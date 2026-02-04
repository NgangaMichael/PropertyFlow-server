import db from '../../models/index.js';

export const getAllExpensesService = async () => {
  return await db.Expense.findAll({
    order: [['id', 'ASC']],
  });
};

export const createExpenseService = async ({ expensetype, amount, description, paidto, paymentmethod }) => {
  return await db.Expense.create({ expensetype, amount, description, paidto, paymentmethod });
};

export const updateExpenseService = async (id, data) => {
  const expense = await db.Expense.findByPk(id);
  await expense.update(data);
  return expense;
};

export const deleteExpenseService = async (id) => {
  const expense = await db.Expense.findByPk(id);
  if (!expense) throw new Error('Expense not found');
  await expense.destroy(); // ✅ Hard delete
  return expense;
};