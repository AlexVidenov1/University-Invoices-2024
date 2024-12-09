export const formatDate = (dateInput: Date | string) => {
  const date = new Date(dateInput);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
