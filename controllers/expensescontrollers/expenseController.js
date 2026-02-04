import { expenseService } from '../../services/index.js';

export const getAllExpenses = async (req, res) => {
  const expenses = await expenseService.getAllExpensesService();
  res.json(expenses);
};

export const createExpense = async (req, res) => {
  const { expensetype, amount, description, paidto, paymentmethod } = req.body;

  try {
    const expense = await expenseService.createExpenseService({
      expensetype, 
      amount,
      description, 
      paidto, 
      paymentmethod
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { expensetype, amount, description, paidto, paymentmethod } = req.body;

  try {
    const updatedExpense = await expenseService.updateExpenseService(id, {
      expensetype, 
      amount, 
      description, 
      paidto, 
      paymentmethod
    });

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await expenseService.deleteExpenseService(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};