import { useEffect, useState } from "react";
import "./styles.css"
import { userDTO } from "../../../models/usersDTO";
import * as userService from "../../../services/user-service"

export default function AdminHome() {
const [user, setUser] = useState<userDTO>();

useEffect(() => {
  userService.findMe()
      .then( response =>{ 
        setUser(response.data)
      })
},[] )


  return (
    <main>
      <section id="admin-home-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">
          Bem-vindo à àrea administrativa {user?.name}
        </h2>
      </section>
    </main>
  );
}
