import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const Addlocationdetails = () => {
  const [formData, setFormData] = useState({
    startPoint: "",
    endPoint: "",
    date: "",
    garbageType: [],
  });

  const locations = [
    { name: "Kaduwela", coordinates: "6.929122107099494, 79.9827447585531" },
    { name: "Koswaththa", coordinates: "6.907763319814276, 79.9292102953063" },
    { name: "Pothuhera", coordinates: "7.419931760112256, 80.3282878007621" },
    { name: "Kurunegala", coordinates: "7.485868240115851, 80.36430279599983" },
    { name: "Rajagiriya", coordinates: "6.909246272982172, 79.89611987096255" },
  ];
  const names = ["Fashion Item", "Food Item", "Fruits Item"]; // Corrected typo in "Fruits Item"

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Extracting coordinates from the locations array based on selected names
      const startPointObject = locations.find(location => location.name === formData.startPoint);
      const endPointObject = locations.find(location => location.name === formData.endPoint);
  
      const startPointCoordinates = startPointObject.coordinates;
      const endPointCoordinates = endPointObject.coordinates;
  
      // Extracting latitude and longitude values
      const [startPointLat, startPointLong] = startPointCoordinates.split(", ");
      const [endPointLat, endPointLong] = endPointCoordinates.split(", ");
  
      const response = await axios.post(
        `http://localhost:5000/Api/Addcollectingdata/add/collectingdetail`,
        {
          ...formData,
          startPoint: startPointObject.name,
          endPoint: endPointObject.name,
          startPointLat,
          startPointLong,
          endPointLat,
          endPointLong
        }
      );
      console.log(response.data); // Log the response from the server
      // Reset form after successful submission
      setFormData({
        startPoint: "",
        endPoint: "",
        date: "",
        garbageType: [],
      });
      alert("Collecting detail added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to add collecting detail");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ width: '400px' }}>
        <Typography
          component="h1"
          color="inherit"
          noWrap
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Adding Location Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Start Point</InputLabel>
              <Select
                required
                value={formData.startPoint}
                onChange={handleChange}
                name="startPoint"
              >
                {locations.map((location) => (
                  <MenuItem key={location.name} value={location.name}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>End Point</InputLabel>
              <Select
                required
                value={formData.endPoint}
                onChange={handleChange}
                name="endPoint"
              >
                {locations.map((location) => (
                  <MenuItem key={location.name} value={location.name}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="date"
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
             <InputLabel>Pakege Type</InputLabel>
             <Select
               multiple
               value={formData.garbageType}
               onChange={handleChange}
               inputProps={{ "aria-label": "Select Garbage Type" }}
               name="garbageType"
             >
               {names.map((name) => (
                 <MenuItem key={name} value={name}>
                   {name}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>
           </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: '100%' }}>
       Add
        </Button>
        <br />
        <a href="/location" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              View Map
               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </Box>
    </Box>
  );
};

export default Addlocationdetails;
