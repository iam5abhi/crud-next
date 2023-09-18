import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Update = () => {
    const router = useRouter()
    const {id} = router.query;
    const [formData,setFormData]=useState({fname:'',lname:''})

    const onchange=(event)=>{
        setFormData((pre)=>({
            ...pre,
            [event.target.name]:event.target.value
        }))
    }

    const onSubmit=(event)=>{
        event.preventDefault();
        fetch("/api/data/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData,id:id})
        }).then(()=>{router.push('/')})
    }

    const GetOne = () => {
        fetch("/api/data/getone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => {
            // Check if the response status is okay (2xx status code)
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json(); // Parse the JSON data
          })
          .then((data) => {
            // Data is the parsed JSON object
            setFormData({
              fname: data.fname,
              lname: data.lname,
            });
          })
          .catch((error) => {
            // Handle any errors that occurred during the fetch or JSON parsing
            console.error("Error fetching or parsing data:", error);
            // You can set the category state to a default value or handle the error in another way
          });
      };

      useEffect(()=>{
        GetOne();
      },[id])

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input type="text" id="fname" value={formData.fname} onChange={onchange} name="fname" />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input type="text" id="lname" value={formData.lname} onChange={onchange} name="lname" />
        <br />
        <br />
        <input type="submit" defaultValue="Submit" />
      </form>
    </>
  );
};

export default Update;
 