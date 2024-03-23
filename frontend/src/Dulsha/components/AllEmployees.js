import axios from 'axios';
import React, {useState, useEffect} from 'react';
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import DeleteEmployee from './DeleteEmployee';
import Sidebar from './Sidebar'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



export default function AllEmployees() {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState("");
  
    const { id } = useParams();
   
   

    useEffect(() => {
        getEmployees();
    }, [])
        function getEmployees(){
            axios.get("http://localhost:5000/employees/").then((res) =>{
                console.log(res.data);
                setEmployees(res.data);
               
        
            }).catch ((err)=>{
                alert(err.message);
            })
        }
        function DeleteEmployee(id) {
            if (!id) {
              console.error("ID is undefined or null.");
              return;
            }
          
            confirmAlert({
              title: 'Confirm Delete',
              message: 'Are you sure you want to delete this employee details?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    axios.delete("http://localhost:5000/employees/delete/" + id)
                      .then(function() {
                        console.log("Employee details deleted");
                        toast.success("Employee details deleted",{theme:'colored'});
                        getEmployees();
                      })
                      .catch(function(error) {
                        console.error(error);
                        alert("Failed to delete employee details.");
                      });
                  }
                },
                {
                  label: 'No',
                  onClick: () => {
                    toast.info("Employee details not deleted",{theme:'colored'});
                  }
                }
              ]
            });
          }
        


    function handleFilterChange(e) {
      setFilter(e.target.value);
    }
    const filteredEmployees = employees.filter((emp) => {
      return emp.ID.toLowerCase().includes(filter.toLowerCase());
  
    })
    function generatePDF(bills) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
      
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
      
        const title = "Employee Details";
        const headers = [
          ["Employee ID", " Name", "Contact Number", "Designation", "Join Date"],
        ];
      
        const data = filteredEmployees.map((emp) => [
          emp.ID,
          emp.name,
          emp.contact,
          emp.designation,
          emp.join
        ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
      
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("EmployeeReport.pdf");
        toast("Employee Report Downloaded");
      };
    
      
  
    return(
        <div >
          <Sidebar/>
        <div class="p-4 sm:ml-64">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white:text-dark">
        Employees table
              </h1>
         
              <form class="max-w-md mx-auto" style={{marginRight:"20px"}}>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative flex">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={handleFilterChange} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 right-2.5">Search</button>
    </div>
</form>

   




<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <br></br>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          
            <tr>
            <th scope="col" class="px-6 py-3">
                Index
                </th>
                <th scope="col" class="px-6 py-3">
                Employee ID
                </th>
                <th scope="col" class="px-6 py-3">
                Name
                </th>
                <th scope="col" class="px-6 py-3">
                Image  
                </th>
                <th scope="col" class="px-6 py-3">
                Contact
                </th>
                <th scope="col" class="px-6 py-3">
                Designation
                </th>
                <th scope="col" class="px-6 py-3">
                Join Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {filteredEmployees.map((emp,index)=>{
                return(
                  <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {index+1}
                  </th>
                  <td class="px-6 py-4">
                  { emp.ID}
                  </td>
                  <td class="px-6 py-4">
                  {emp.name}
                  </td>
                  <td class="px-6 py-4">
                  <center><img height={"100px"} width={"100px"} src={`http://localhost:5000/images/${emp.filepath}`} /></center><br></br><br></br>
                  </td>
                  <td class="px-6 py-4">
                  {emp.contact}
                  </td>
                  <td class="px-6 py-4">
                  {emp.designation}
                  </td>
                  <td class="px-6 py-4">
                  {emp.join}
                  </td>
                  <td class="px-6 py-4">
                     
                      <Link class="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={"/updateemployee/" + emp._id} style={{paddingRight: '20px'}}>
                                    <i className="fas fa-edit"  ></i> &nbsp;Edit
                                    </Link>
                                    &nbsp;
    
                                    <Link class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#" onClick={() => DeleteEmployee(emp._id)}style={{paddingRight: '10px'}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </Link>

                  </td>
              </tr>
              
                );})}

           
        </tbody>
    </table>
    <Link class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" to={"/addemployee/"}>
            <i class="fa-solid fa-plus"></i>&nbsp;Add New Employee
            </Link>
            &nbsp;&nbsp;
        <button type="submit" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
        <ToastContainer></ToastContainer>
      
        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Total Employees: {filteredEmployees.length}
    </div>
</div>
</div>

        </div>
    )
}
