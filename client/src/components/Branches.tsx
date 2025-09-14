import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import type { Branch } from "../types/user-defined-types";
import SingleBranchCard from "./SingleBranchCard";


export default function Branches(){

    const [loading, setLoading] = useState(true);

    const [branches, setBranches]= useState([]);

   useEffect(()=>{
      async function fetchBranches(){
        try {
            const apiResponse = await fetch('http://localhost:3000/api/branch');
            const result = await apiResponse.json();
            console.log(result);
            if(result.success){
                setBranches(result.data)
            }

        } catch (error) {
            console.log('some error occured while trying to fetch branches', error);
        }
        finally{
            setLoading(false)
        }
      }
      fetchBranches()
   },[])

    return (
  <div>
    <Navbar />
    <div className="flex flex-col">
      <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
        <h1 className="text-5xl font-roboto">Branches</h1>
        <p className="font-inter">
          FINCA Malawi has multiple branches across the country.
        </p>
      </div>

      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center mt-5">
            <p className="text-3xl">Loading branches please wait...</p>
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {branches.map((branch: Branch) => (
              <SingleBranchCard key={branch.branch_id} {...branch}/>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

}