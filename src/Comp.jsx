
import React,{useState} from 'react'
import './App.css';
const Component1 = () => {
   const[count,setCount]=useState(0);
  // const[name,setName]=useState("");
   const handleClick=()=>{
    setCount(count+1);
   };
   const handleClicksub=()=>{
    setCount(count-1);
   };
   const handleClickreset=()=>{
    setCount(0);
   };
//    const handleChange=(e)=>{
// setName(e.target.value);
//    }
//    const handleSubmit=()=>{
//     console.log(name);
   
  return (
    <>
    <p>{count}</p>
   <div className="btn-group">

    <button  onClick={handleClick}>Inc</button><>  </>
    <button onClick={handleClicksub}>Dec</button><>  </>
    <button onClick={handleClickreset}>reset</button><>  </>
    {/* <input type='text' value={name} onChange={handleChange}></input>
    <button onClick={handleSubmit}>Submit</button> */}
    </div></>
  )
}
  export default Component1
// import { useState, useEffect } from "react";

// function CounterTitle() {
//   const [post, setPost] = useState([]);

//   useEffect(() => {
//    //then is used when  if it is working
//    fetch("https://home.openweathermap.org/api_keys/3fe3df1b307ce6802b082acefabe2b70").then
//    (
//     response=> response.json())
//     .then(data=> setPost(data))
//   }, []);

//   return(
//     <>
      
// <ul>
//   {
//     post.map(u => (<>
//         <h2>{u.id}</h2>
//           <h3>{u.title}</h3>
//           <p>{u.body}</p>
//         </>
//       ))
//   }
// </ul>
      
//     </>
//   );
// }

// export default CounterTitle;