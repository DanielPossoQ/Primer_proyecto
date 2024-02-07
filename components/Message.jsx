import { useState } from "react"
import "../styles/Message.css"
export default function Message({message, show, setShow}){
    
    return (
        <div className="container">
            {show && <div className="cube"> 
            <h2>{message}</h2>
            <button onClick={()=>setShow(!show)}>Cerrar</button>
            </div>}
        </div>
    )
}