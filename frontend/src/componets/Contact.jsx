import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import {useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
function Contact  ({car}) {
    const {id} = useParams()
    const [message, setMessage] = useState("")
    const [owner, setOwner] = useState(false)
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    
    useEffect(()=>{
const getOwner = async ()=>{
    try{
        const res = await axios.get(`http://localhost:8000/api/auth/${car.sellerRef}`,{
            withCredentials: true,
        })
        const data = res.data?.data || res.data
        setOwner(data)
    }catch(err){
        console.log(err)
    }
}
getOwner()
    },[car.sellerRef])
  return (
    <>
    {owner &&(
        <div className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-[0.98]">
      <h2>Contact Seller</h2>  
  Contact <span>{owner?.username}</span>
s
  <textArea className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-[0.98]">
    <input    onChange={handleChange} value={message}
     name="message" type="text" id="message" placeholder="send message here" required></input>
  </textArea> 
  <Link to ={`mailto: ${owner.email}`} className="mt-5 block w-full rounded-xl bg-yellow-400 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-yellow-300 active:scale-[0.98]">Send Email</Link>
    </div>
    )}
    
    </>
  )
  

}

export default Contact
