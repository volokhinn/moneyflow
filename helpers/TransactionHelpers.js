export const keywordsToIcons = {
  spotify: {
    img: require('../assets/services/spotify.png'),
    cat: 'Entertaiments',
  },
  youtube: {
    img: require('../assets/favicon.png'),
    cat: 'Entertaiments',
  },
  'вилка-ложка': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
  'бк': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
  'бургер-кинг': {
    img: require('../assets/favicon.png'),
    cat: 'Restaurants',
  },
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
