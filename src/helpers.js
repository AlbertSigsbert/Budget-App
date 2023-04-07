export const wait = () => {
  return new Promise((res) => setTimeout(res, Math.random() * 2000));
};

//colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

//Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//get all matching items from LS
export const getAllMatchingItems = ({category, key,value}) => {
 const data = fetchData(category) ?? [];
 return data.filter(item => item[key] === value);
}

//create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudget = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudget, newItem])
  );
};

//create expenses
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };

  const existingExpense = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpense, newItem])
  );
};

//delete item
export const deleteItem = ({ key,id }) => {
  const existingData = fetchData(key)
  if(id){
    const newData = existingData.filter(item => item.id !== id)
    return localStorage.setItem(key,JSON.stringify(newData))
  }
  return localStorage.removeItem(key);
};

//total spent by budget

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

//FORMATTING

//Format date to locale date string
export const formatDate = (epoch) => new Date(epoch).toLocaleDateString()



//Format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

//Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
