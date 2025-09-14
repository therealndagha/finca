import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import type { Loan_Product } from "../types/user-defined-types";
import SingleLoanProductCard from "./SingleLoanProductCard";


export default function Loans(){
    const [loading, setLoading] = useState(true);
    const [loanProducts, setLoanProducts] = useState([]);

    useEffect(()=>{
         async function fetchLoanProducts(){
              try {
                const apiResponse = await fetch('http://localhost:3000/api/loanproducts');
                const result = await apiResponse.json();
                console.log(result);
                if(result.success){
                    setLoanProducts(result.data)
                }
              } catch (error) {
                console.log('some error occured while fetching loan product list');
              }finally{
                setLoading(false)
              }
         }
         fetchLoanProducts();
    }, [])
    return (
        <div>
            <Navbar/>
              <div className="flex flex-col">
              <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
                <h1 className="text-5xl font-roboto">Loan Products</h1>
                <p className="font-inter">
                   We provide the following loan solutions
                </p>
              </div>
        
              <div>
                
                {loading ? (
                  <div className="flex flex-row items-center justify-center mt-5">
                    <p className="text-3xl">Loading loan products please wait...</p>
                    <Spinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                     {
                        loanProducts.map((loan_product: Loan_Product)=>(
                            <SingleLoanProductCard key={loan_product.product_id} {...loan_product}/>
                        ))
                     }
                  </div>
                )}
              </div>
            </div>
        </div>
      
    )
}