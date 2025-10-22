export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  // Assuming dateString is already in DD/MM/YYYY format for simplicity based on mock data
  return dateString;
};