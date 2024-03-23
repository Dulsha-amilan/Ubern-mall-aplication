import React, {useState , useEffect} from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AddEmployeeImage from "./images/addEmployee.png";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Sidebar from './Sidebar'
import Lottie from 'react-lottie';
import animationData from '../components/images/Animation - 1710833693479.json';




export default function AddEmployee(){
  
  const ShopID = `shop${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const [name, setName]= useState("");
  const [filepath, setFilepath]= useState("");
  const[contact, setContact]= useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const[catogory, setcatogory]=useState("");
  const[join,setJoin]= useState(getCurrentDate());
  const [errors,setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    setJoin(getCurrentDate()); // Update the current date each time the component is rendered
  }, []);
  

  const handlePhoneChange = (e) => {
    setContact
    (e.target.value);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("Invalid phone number");
      document.getElementById("phone-error").style.color = "red";
    } else {
      setPhoneError("");
      document.getElementById("phone-error").style.color = "inherit";
    }
  };
 
 

  function handleImage(e) {
    console.log(e.target.files);
    setFilepath(e.target.files[0])

   

  }
  

   function sendData(e){
    e.preventDefault();

    if(ShopID.length===0 || name.length===0 || contact.length===0 || catogory.length===0 || join.length===0 || filepath.length===0){
      setError(true);
  }
  else{
        const formData = {
        ShopID,
          name,
          filepath,
          contact,
          catogory,
          join
      }
    }

    const formData = new FormData();


    formData.append('ShopID', ShopID);
    formData.append('name', name);
    formData.append('filepath', filepath);
    formData.append('contact', contact);
    formData.append('catogory', catogory);
    formData.append('join', join);


    axios.post("http://localhost:5000/shop/add", formData).then(()=>{
      
      //alert("Employee Added")
      toast.success("Shop Added Successfully!",{theme:'colored'});

      
    }).catch((err)=>{
      toast.error(err);
    })
  }


    return(
      <div>
        
         <div 
        
        style= {{
          
          display: 'flex',
          justifyContent: 'center', /* Center horizontally */
          alignItems: 'center', /* Center vertically */
          minHeight: '100vh',
          backgroundImage: `url("../images/finance-background.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',


      }}>
      
      
        <div className= "container" style={{display:"flex"}}>
        <ToastContainer></ToastContainer>
        <div className="container" style={{ display: "flex" }}>
                        <div style={{ width: '600px', height: '500px', marginTop: '10px' }}>
                            <Lottie options={{ loop: true, autoplay: true, animationData: animationData }} />
                        </div>
                      
                        &nbsp;&nbsp;&nbsp;&nbsp;

          <div className="addEmployeeForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue",
                    width:"1000px"
                }}>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white:text-dark">
          Add New Shop
              </h1>
        <form onSubmit={sendData} class="max-w-sm mx-auto">
           <div class="mb-5">
    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark" >Shop ID :</label>
    <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={ShopID}  aria-describedby="emailHelp" placeholder="Enter Shop Name"
    />

          {errors&&ShopID.length<=0?<label className="validation-label">ID cannot be empty</label>:""}
  </div>
        <div className="mb-5">
        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Shop Name :</label>
        <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} placeholder="Enter Employee Name"
           onChange={(e)=>{

     setName(e.target.value);
}}/>

{errors&&name.length<=0?<label className="validation-label">Name cannot be empty</label>:""}
  </div>

  <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 white :text-dark" for="file_input">Upload Image :</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
              onChange={
                handleImage

              } />
             {errors&&filepath.length<=0?<label className="validation-label">Image cannot be empty</label>:""}

          </div>

          <div className="mb-5">
  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 white:text-dark"> Contact No  :</label>
  <input
        type="tel"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="contact"
        name="contact"
        value={contact}
        onChange={handlePhoneChange}
      />
     
      <span id="phone-error">{phoneError}</span>
   
         {errors&&contact.length<=0?<label className="validation-label">Contact Number cannot be empty</label>:""}
  </div>  

  <div className="form-group">
  <div className="form-group">
  <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">catogory:</label>
  <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"id="catogory" value={catogory} onChange={(e) => setcatogory(e.target.value)}>
    <option value="">Select catogory</option>
    <option value="Chef">Nike</option>
    <option value="Waiter">Boots</option>
    <option value="Reseptionist">Bags</option>
    <option value="Cleaner">Food coner</option>
    <option value="Driver">Piza</option>
  </select>
  {errors && catogory.length <= 0 ? <label className="validation-label">catogory cannot be empty</label> : ""}
</div>
  </div>
 <br></br>
  <div class="relative max-w-sm">
                        <label for="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Join Date : </label>
        <input type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="join" name="join" value={join} max={join}  min={join} onChange={(event) => setJoin(event.target.value)} required />
                        {errors&&join.length<=0?<label className="validation-label">Join Date cannot be empty</label>:""}
                    </div>

 <br></br>
 

 <button type="submit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    &nbsp;&nbsp;
                    <Link class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"  to={"/viewemployee"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </Link>
</form>
   </div>
   </div>
  </div>
  </div>
      </div>
     
   
    )
}


