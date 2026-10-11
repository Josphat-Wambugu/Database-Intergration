import React, { useState } from "react";
import axios from "axios";
import { createUser } from "../controllers/userController";

const [formData,setFormData] = useState({
  name: "",
  email: "",
  age: "",
  city: "",
});

const [error,setError] = useState("");

const createUserRequest = async () => {
    try {
        const response = await axios.post("http://localhost:3001/users/createUser", formData);
    

        if(response.status < 200 || response.status >= 300){
            throw new Error("Failed to create user");
        }
        return true;
    }catch(error){
        console.error("Error creating user:", error);
        setError("Failed to create user");
        return false;
    }
};


const handleCreateUser = async()=>{
    if(!formData.name || !formData.email){
        setError("Name and Email are mandatory fields");
        return;
    }

    if(await createUserRequest()){
        setFormData({
            name:"",
            email:"",
            age:"",
            city:"",
        });
        setError("");
    }

};

//Return JSX
return (
  <div className="newUserForm">
  <h2>Create Users</h2>
  {/* Form inputs */}
  <input
    type="text"
    placeholder="Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  />
  <input
    type="email"
    placeholder="Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />
  <input
    type="number"
    placeholder="Age"
    value={formData.age}
    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
  />
  <input
    type="text"
    placeholder="City"
    value={formData.city}
    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
  />

 {/* Create User button */}
  <button onClick={handleCreateUser}>Save</button>

 {/* Display error message if exists */}
  {error && <p style={{ color: "red" }}>{error}</p>}
 </div>
 );

 export default createUser;