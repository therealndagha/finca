
import { FaPhone, FaUsers } from 'react-icons/fa';
import type { Group } from "../types/user-defined-types";


export default function SingleGroupCard({group_name, group_type, phone_no, branch_id}: Group){
    return(
        
             <div className="p-4 bg-gray-100 rounded-lg shadow space-y-2">
                <h2 className="text-xl font-bold flex items-center space-x-2"><FaUsers/> <span>{group_name}</span></h2>
                <p className="text-gray-800 font-open-sans">{group_type}</p>
                <p className="text-gray-700 flex items-center space-x-2 font-open-sans"><FaPhone/> <span>{phone_no}</span></p>
                {/* <p className="text-gray-500">{branch_id}</p> */}
                <button className='px-2 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-800'>More Details</button>

              </div>
    )
}