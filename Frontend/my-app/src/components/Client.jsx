import React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import './Client.css'


async function getClients(){
  let clients = await axios('http://localhost:3001/client')
  return clients
}


export default function Client(){
  const [clients, setClients] = useState({data:[]})
  useEffect(() => {
    async function getData(){
    setClients(await getClients())
    console.log(typeof(clients))
    
    }
    getData()
  }, [])
  
    return (
    
        <div>
          <h1>Clientes</h1>
         {clients.data.length === 0 ?(
          <div>no hay nada</div>
         ):
          clients.data.map(c => {
            return(

        <div class="card text-bg-dark mb-3">
        <div class="card-body">
          <h5 class="card-title">{c.name}</h5>
          <ul class="card-text">
            <li>+{c.phone}</li>
            <li>{c.countrie}</li>
          </ul>
          <Link to={'/conversation/'+ c.id + '/'}>
          <a href="#" class="btn btn-primary">Enviar sms</a>
          </Link>
        </div>
      </div>
            )

          })}


      </div>
    )
}