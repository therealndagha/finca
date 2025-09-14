import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import type { Group } from "../types/user-defined-types";
import SingleGroupCard from "./SingleGroupCard";


export default function Groups(){
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(()=>{
         async function fetchGroups(){
              try {
                const apiResponse = await fetch('http://localhost:3000/api/group');
                const result = await apiResponse.json();
                console.log(result);
                if(result.success){
                    setGroups(result.data)
                }
              } catch (error) {
                console.log('some error occured while fetching customer list');
              }finally{
                setLoading(false)
              }
         }
         fetchGroups();
    }, [])
    return (
        <div>
            <Navbar/>
              <div className="flex flex-col">
              <div className="bg-blue-950 text-white py-5 pl-5 space-y-5">
                <h1 className="text-5xl font-roboto">Groups</h1>
                <p className="font-inter">
                  FINCA MALAWI has <span>
                     {
                      groups && groups.length>0 ? <span>{groups.length}</span> : null
                     }
                    </span> registered groups
                </p>
              </div>
        
              <div>
                
                {loading ? (
                  <div className="flex flex-row items-center justify-center mt-5">
                    <p className="text-3xl">Loading groups please wait...</p>
                    <Spinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                     {
                        groups.map((group: Group)=>(
                            <SingleGroupCard key={group.group_id} {...group}/>
                        ))
                     }
                  </div>
                )}
              </div>
            </div>
        </div>
      
    )
}