//rrd imports
import { useLoaderData } from "react-router-dom";

//helpers
import { deleteItem, fetchData } from "../helpers";

//components
import Table from "../components/Table";

//lib imports
import { toast } from "react-toastify";

//loader
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

//action
export async function expensesAction({request}){
  const data = await request.formData()
  const { _action, ...values} = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      
       deleteItem({
        key:"expenses",
        id:values.expenseId
       })
      // throw new Error("You failed")
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
            <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
            <Table expenses={expenses} />
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
