import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import type { Customer } from "../types/user-defined-types";


export default function SingleCustomerCard({f_name, l_name, address, phone_no, email,customer_id, branch_id}: Customer){
    return(
        
             <div className="p-4 bg-gray-100 rounded-lg shadow space-y-2">
                <h2 className="text-xl font-bold flex items-center space-x-2"><FaUser/> <span>{f_name} {l_name}</span></h2>
                <p className="text-gray-700 font-bold flex items-center space-x-2 font-open-sans">Customer ID: {customer_id}</p>
                <p className="text-gray-700 font-bold flex items-center space-x-2 font-open-sans">Branch ID: {branch_id}</p>
                <p className="text-gray-700 flex items-center space-x-2 font-open-sans"><FaEnvelope/> <span>{email}</span> </p>
                <p className="text-gray-700 flex items-center space-x-2 font-open-sans"><FaPhone/> <span>{phone_no}</span></p>
                <p className="text-gray-500 flex items-center space-x-2 font-open-sans"> <FaMapMarkerAlt/> <span>{address}</span> </p>
                <button className='px-2 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-800'>More Details</button>

              </div>
    )
}