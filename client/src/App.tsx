import { Route, Routes } from "react-router-dom";
import Branches from "./components/Branches";
import Customers from "./components/Customers";
import Staff from "./components/Staff";
import Loans from "./components/Loans";
import Groups from "./components/Groups";
import Home from "./components/Home";
import LoanApplication from "./components/LoanApplication";
import Roles from "./components/Roles";
import Products from "./components/Product";




export default function App(){

  return (
    <>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/branches" element={<Branches/>} />
         <Route path="/customers" element={<Customers/>}/>
         <Route path="/staff" element={<Staff/>}/>
         <Route path="/loans" element={<Loans/>}/>
         <Route path="/groups" element={<Groups/>}/>
         <Route path="/products" element={<Products/>}/>
         <Route path="/apply/" element={<LoanApplication/>}/>
         <Route path="/roles" element={<Roles/>}/>
      </Routes>
    </>
  )
}