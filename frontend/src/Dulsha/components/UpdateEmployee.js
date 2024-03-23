import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import updateEmployeeImage from "./images/updateEmployee.png";


export default function UpdateEmployee(){
    const { id } = useParams();

    const [employee,setEmployee] = useState([]);
    const [ID,setId] = useState("");
    const [name,setName] = useState("");
    const [filepath,setFilepath] = useState("");
    const [contact,setContact] = useState("");
    const [designation,setDesignation] = useState("");
    const [join,setJoin] = useState("");
    const [errors,setError] = useState("");

    useEffect(() => {
        function getEmployee(){
            axios.get("http://localhost:5000/employees/get/" + id).then((res) => {
                console.log(res.data);
                setEmployee(res.data);
                setId(res.data.ID)
                setName(res.data.name)
                setFilepath(res.data.filepath)
                setContact(res.data.contact)
                setDesignation(res.data.designation)
                setJoin(res.data.join)
            }).catch((error) => {
                alert(error.message);
            })
        }
        getEmployee();
    }, [id])

    function handle(e){
        e.preventDefault();

        if(ID.length===0 || name.length===0 || filepath.length===0 ||contact.length===0 || designation.length===0 || join.length===0){
            setError(true);
        }
        else{
            const UpdateEmployee = {
                ID,
                name,
                filepath,
                contact,
                designation,
                join
            }
    
            console.log(UpdateEmployee)
    
            axios.put("http://localhost:5000/employees/update/" + id, UpdateEmployee).then(function(){
                toast.success("Employee Updated Sucessfully!",{theme:'colored'});
                setId("");
                setName("");
                setFilepath("");
                setContact("");
                setDesignation("");
                setJoin("");
                setError("");
            }).catch((error) => {
                toast.error(error);
            })
        }
    }

    return(
        <div  style= {{
          
            display: 'flex',
            justifyContent: 'center', /* Center horizontally */
            alignItems: 'center', /* Center vertically */
            minHeight: '100vh',
            backgroundImage: `url("../images/finance-background.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
  
  
        }} >
          
            <div className="container" style={{display:"flex"}}>
            <ToastContainer></ToastContainer>
            <div className="updateEmployeeImg">
            <img src={updateEmployeeImage} alt="EmployeeImage" style={{height:'400px' , width:'600px', marginTop:'50px'}}></img>
            </div>


            &nbsp;&nbsp;&nbsp;&nbsp;

            <div className="updateEmployeeForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue",
                    width:"1000px"
                }}>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white:text-dark">
          Update Employee
              </h1>
            <form onSubmit={handle} class="max-w-sm mx-auto">
                <div class="mb-5">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">EmployeeID : </label>
                    <input ttype="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  aria-describedby="emailHelp" value={ID} placeholder={`Enter ID (${ID})`}
                    onChange={(e) => {
                        setId(e.target.value);
                    } } />
                    {errors&&ID.length<=0?<label className="validation-label">EmployeeID cannot be empty</label>:""}
                </div>
                <div class="mb-5">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">EmployeeName : </label>
                    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   value={name} placeholder="Enter Employee Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    } }/>
                    {errors&&name.length<=0?<label className="validation-label">EmployeeName cannot be empty</label>:""}
                </div>
                <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 white :text-dark" for="file_input">Upload Image : </label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                    onChange={(e) => {
                        setFilepath(e.target.value);
                    } }/>
                    {errors&&filepath.length<=0?<label className="validation-label">Image cannot be empty</label>:""}
                </div>
                <div class="mb-5">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">ContactNumber : </label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="contact" value={contact} placeholder="Enter Contact Number"
                    onChange={(e) => {
                        setContact(e.target.value);
                    } }/>
                    {errors&&contact.length<=0?<label className="validation-label">Contact cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Designation : </label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  id="designation" value={designation} placeholder="Enter Designation"
                    onChange={(e) => {
                        setDesignation(e.target.value);
                    } }/>
                    {errors&&designation.length<=0?<label className="validation-label">Designation cannot be empty</label>:""}
                </div>
                <div class="relative max-w-sm">
                    <label  for="block mb-2 text-sm font-medium text-gray-900 white:text-dark">JoinDate : </label>
                    <input type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="join" value={join} placeholder="Enter Join Date(eg:2022-03-02)"
                    onChange={(e) => {
                        setJoin(e.target.value);
                    } }/>
                    {errors&&designation.length<=0?<label className="validation-label">JoinDate cannot be empty</label>:""}
                </div>
                
                <br/>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Update</button>
                &nbsp;&nbsp;
                <Link class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"  to={"/viewemployee"}>
                <i class="fa-solid fa-backward"></i>&nbsp;Back
                </Link>
            </form>
            </div>
        </div>
     
        </div>
    )
}