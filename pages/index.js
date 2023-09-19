import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import { auth, logout } from "../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function Home() {
  const router = useRouter()
  const [data,setData]=useState([]);
  const [user ] = useAuthState(auth);

  const GetData =()=>{
    fetch("/api/data/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => { return res.json() }
    ).then((res) => setData(res))
  }

  const DeleteData =(id)=>{
    fetch("/api/data/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({id:id}),
    }).then((res) => GetData())
  }

  useEffect(()=>{
    GetData();
  },[])

  return (
    <>
     <div className="Add">
    <h2>LOGO</h2>
    <button type="button" onClick={()=>logout()} >Logout</button>
    </div>
    <div className="Add">
    <h2>Data Table</h2>
    <button type="button" onClick={()=>router.push('/add')} >Add</button>
    </div>
    <table>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Actions</th>
  </tr>
  {data.map((data)=>{
    return <tr key={data.id}>
    <td>{data.fname}</td>
    <td>{data.lname}</td>
    <td>
      <button type="button" onClick={()=>router.push(`/${data.id}`)}>Update</button>
      <button type="button" onClick={()=>DeleteData(data.id)}>Delete</button>
    </td>
  </tr>
  })}
</table>
    </>
  )
}
export default PrivateRoute(Home)
