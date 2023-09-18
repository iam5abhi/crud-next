import { useRouter } from "next/router";
import React, { useState } from "react";

const Add = () => {
    const router = useRouter()
    const [formData,setFormData]=useState({fname:'',lname:''})

    const onchange=(event)=>{
        setFormData((pre)=>({
            ...pre,
            [event.target.name]:event.target.value
        }))
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        fetch("/api/data/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(()=>{router.push('/')})
    }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input type="text" id="fname" onChange={onchange} name="fname" />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input type="text" id="lname" onChange={onchange} name="lname" />
        <br />
        <br />
        <input type="submit" defaultValue="Submit" />
      </form>
    </>
  );
};

export default Add;
