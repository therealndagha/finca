import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import SingleCustomerCard from "./SingleCustomerCard";
import type { Customer } from "../types/user-defined-types";
import AddCustomer from "./AddCustomer";


export default function Customers(){
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [triggerCustomerListRefresh, setTriggerCustomerListRefresh] = useState<boolean>(false);

    useEffect(()=>{
         async function fetchCustomers(){
              try {
                const apiResponse = await fetch('http://localhost:3000/api/customer');
                const result = await apiResponse.json();
                //console.log(result);
                if(result.success){
                    setCustomers(result.data)
                }
              } catch (error) {
                console.log('some error occured while fetching customer list')
              }finally{
                setLoading(false)
              }
         }
         fetchCustomers()
    }, [triggerCustomerListRefresh, customers])
    return (
        <div>
            <Navbar/>
              <div className="flex flex-col">
              <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
                <h1 className="text-5xl font-roboto">Customers</h1>
                <p className="font-inter">
                  Below is a list of our registered customers using a variety of our services.
                </p>
              </div>
        
              <div>
                 <div>
                   {
                    customers && customers.length > 0 ? <p className="text-center my-5 font-roboto"> <span className="text-5xl">{customers.length}</span> active customers found</p>: <p>No customers found</p>
                   }
                 </div>
                {loading ? (
                  <div className="flex flex-row items-center justify-center mt-5">
                    <p className="text-3xl">Loading customers please wait...</p>
                    <Spinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                     {
                        customers.map((customer: Customer)=>(
                            <SingleCustomerCard key={customer.customer_id} {...customer}/>
                        ))
                     }
                  </div>
                )}
              </div>
              <AddCustomer setTriggerCustomerListRefresh={setTriggerCustomerListRefresh} />
            </div>
        </div>
      
    )
}