import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import type { Staff } from "../types/user-defined-types";
import SingleStaffCard from "./SingleStaffCard";


export default function Staff(){
    const [loading, setLoading] = useState(true);
    const [staffList, setStaffList] = useState([]);

    useEffect(()=>{
         async function fetchStaffList(){
              try {
                const apiResponse = await fetch('http://localhost:3000/api/staff');
                const result = await apiResponse.json();
                console.log(result);
                if(result.success){
                    setStaffList(result.data)
                }
              } catch (error) {
                console.log('some error occured while fetching staff list');
              }finally{
                setLoading(false)
              }
         }
         fetchStaffList();
    }, [])
    return (
        <div>
            <Navbar/>
              <div className="flex flex-col">
              <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
                <h1 className="text-5xl font-roboto">Staff</h1>
                <p className="font-inter">
                  Get to know our staff
                </p>
              </div>
        
              <div>
                
                {loading ? (
                  <div className="flex flex-row items-center justify-center mt-5">
                    <p className="text-3xl">Loading staff list please wait...</p>
                    <Spinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                     {
                        staffList.map((staff: Staff)=>(
                            <SingleStaffCard key={staff.staff_id} {...staff}/>
                        ))
                     }
                  </div>
                )}
              </div>
            </div>
        </div>
      
    )
}