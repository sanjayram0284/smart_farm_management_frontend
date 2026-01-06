import api from "./api";

export const updateExpense = (cropName, amount) =>
  api.put(`/expenses/update?cropName=${cropName}&amount=${amount}`);

export const getExpenseHistory = (cropName) =>
  api.get(`/expenses/history/${cropName}`);
