export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getCategoryColor = (category) => {
  const colors = {
    Food: 'bg-green-100 text-green-800',
    Transport: 'bg-blue-100 text-blue-800',
    Bills: 'bg-red-100 text-red-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Healthcare: 'bg-pink-100 text-pink-800',
    Shopping: 'bg-yellow-100 text-yellow-800',
    Other: 'bg-gray-100 text-gray-800'
  };
  return colors[category] || colors.Other;
};

export const getCategoryIcon = (category) => {
  const icons = {
    Food: '🍔',
    Transport: '🚗',
    Bills: '📄',
    Entertainment: '🎬',
    Healthcare: '⚕️',
    Shopping: '🛍️',
    Other: '📦'
  };
  return icons[category] || icons.Other;
};