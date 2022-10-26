import React from "react"
import { NavLink } from "react-router-dom"
export default function NavBar(){
    return (
        <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <NavLink exact to="/">
          <a class="navbar-brand" href="#">Sms Kevin</a>
          </NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink exact to="/">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink exact to="/client">
                <a class="nav-link" href="#">Clientes</a>
                </NavLink>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Crear cliente</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}