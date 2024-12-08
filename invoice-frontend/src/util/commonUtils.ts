export const formatDate = (dateInput: Date | string) => {
  const date = new Date(dateInput);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatDateForInvoiceCreation = (dateInput: Date | string) => {
  const date = new Date(dateInput);

  return date.toISOString().split("T")[0];
};

export const STATUS = {
  UNPAID: "unpaid",
  PAID: "paid",
};

export const TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};
