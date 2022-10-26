import React from "react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import './conversation.css'

async function getClient(id){
  const client = await axios('http://localhost:3001/client/'+ id)
  return client
}

export default function Conversation(props){
  const [client, setClient] = useState({})
  const [texto, setTexto] = useState('')
  const {id} = useParams()
  
  useEffect(() => {
    async function getData(){
      setClient(await getClient(id))
    }
    getData()
  }, [])

  function handleTexto(e){
    setTexto(e.target.value)
  }

  async function enviarSms(texto){
    let fecha = new Date()
    let hora = fecha.getHours()
    let tiempo = hora
    let message = {
      message: texto,
      time: parseInt(tiempo),
      id: parseInt(id),
      number: client.data.phone
    }
    try {
      await axios.post('http://localhost:3001/message', message)
      alert(client.data.phone)
      setTexto('')
      window.location.reload()
    } catch (error) {
      setTexto('')
       alert(error)
     }
  }

    return (
        <div>
          {client.data &&(
            <div>
            <h1>Conversación con {client.data.name}</h1>
            <Link to={'/client/'}>
          <a class="btn btn-secondary">Volver</a>
          </Link>
           {client.data.messages.map(c =>{
            return(

            <div class="card">
               <div class="card-body">
               <p class="card-text">{c.message}</p>
               <a class="card-link">{c.time}</a>
              </div>
            </div>
            )
           }
           )
           }
   
            <div className="smswrite">
            <label for="inputPassword5" class="form-label">Escribe tu mensaje</label>
            <input type="textarea" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" onChange={(e) => handleTexto(e)}/>
            <button type="button" class="btn btn-dark" onClick={() => enviarSms(texto)} disabled={texto === ''}>Enviar</button>
            </div>
            </div>
          )
          }
        </div>

    )
}