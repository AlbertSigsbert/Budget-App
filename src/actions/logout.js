//rrd imports
import { redirect } from "react-router-dom";

//toast library
import { toast } from "react-toastify";

//helpers
import { deleteItem } from "../helpers";

export async function logoutAction(){
    
     deleteItem({key:"userName"});
     deleteItem({key:"budgets"});
     deleteItem({key:"expenses"});

     //notify
     toast.success("You've deleted your account!");

    //redirect
    return redirect("/")

}