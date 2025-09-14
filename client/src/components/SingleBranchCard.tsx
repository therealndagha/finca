import { FaPhone, FaMapMarkerAlt, FaHome } from 'react-icons/fa';


import type { Branch } from "../types/user-defined-types";

export default function SingleBranchCard({ branch_name, location, phone_no, branch_id}: Branch){
    return (
             <div className="p-4 bg-gray-100 rounded-lg shadow space-y-2">
                <h2 className="text-xl font-bold flex space-x-2 items-center"><FaHome/> <span>{branch_name}</span></h2>
                <p className="text-gray-700 font-bold flex items-center space-x-2 font-open-sans">Branch ID: {branch_id}</p>
                <p className="text-gray-500 flex space-x-2 items-center font-open-sans"><FaPhone/> <span>{phone_no}</span></p>
                <p className="text-gray-700  flex space-x-2 items-center font-open-sans"><FaMapMarkerAlt/> <span>{location}</span></p>
                <button className='px-2 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-800'>More Details</button>
              </div>
    )
}