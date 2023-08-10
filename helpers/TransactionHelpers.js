export const keywordsToIcons = {
  spotify: {
    img: require('../assets/services/spotify.png'),
    cat: 'Entertaiments',
  },
  youtube: {
    img: require('../assets/favicon.png'),
    cat: 'Entertaiments',
  },
  'Вилка-Ложка': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
  'БК': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
  'Бургер-Кинг': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
  // Добавьте другие ключевые слова и соответствующие иконки
};

export const getCategoryExpenses = (categoryName, transactions) => {
  const totalExpense = transactions.reduce((total, transaction) => {
    if (transaction.isIncome === false && keywordsToIcons[transaction.name.toLowerCase()]?.cat === categoryName) {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  return totalExpense;
};
