import React from "react";
import { useState, useEffect } from "react";
import { Contact } from "../models/contactClass";
import ContactComponent from "./ContactComponent";
import ContactForm from "./ContactForm";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export default function ContactListComponent() {
  
  const navigate = useNavigate()

  const defaultContact = new Contact(
    "Mi contacto",
    "555-7788",
    "mail@mail.com"
  );

  const [contacts, setContacts] = useState([defaultContact]);

  const arrayContacts = [...contacts];

  function deleteContact(contact) {
    const index = contacts.indexOf(contact)
    arrayContacts.splice(index, 1);
    setContacts(arrayContacts);
  }

  function addContact(contact) {
    arrayContacts.push(contact);
    setContacts(arrayContacts);
    localStorage.setItem("Contacts", JSON.stringify(arrayContacts))
  }


  const logOut = () => {
    cookies.remove("UserName", {path: "/"})
    cookies.remove("UserRole", {path: "/"})
    navigate("/", {replace: true});
  };

  const ContactTable = () => {
    return (
      <div className="col-md-9 mt-6 mx-auto">
        <table className="table table-hover mt-4 mb-4">
          <thead className="table-primary">
            <th scope="col" className="table-primary">
              Nombre
            </th>
            <th scope="col" className="table-primary">
              Teléfono
            </th>
            <th scope="col" className="table-primary">
              Email
            </th>
            <th scope="col" className="table-primary">
              Eliminar Contacto
            </th>
          </thead>
          <tbody>
            {contacts.map((contact, index)=> {
                return(
                    <ContactComponent
                    key={index}
                    contact={contact}
                    remove={deleteContact}>
                    </ContactComponent>
                )
            })}
          </tbody>
        </table>
      </div>
    );
  };

  let table = <ContactTable></ContactTable>

  if(contacts.length > 0) {
   table = <ContactTable></ContactTable>
  } else {
    table = (
        <div>
            <h4 className="text-primary mb-5">No hay contactos para mostrar</h4>
        </div>
    )
  }

  useEffect(() => {
    if(!cookies.get("UserName")){
      navigate("/login")
    };
  },);

  return (
    <div className="container">
    <h2 className="mt-3 mb-4 text-primary">Mis contactos</h2>
      <div className="col-md-9 mt-6 mx-auto">
      {table}
      </div>
      <ContactForm add={addContact} length={contacts.length}></ContactForm>
        <button
          id="logOut"
          type="button"
          className="btn btn-info mt-5"
          onClick={() => logOut()}
        >
          Cerrar sesión
        </button>
      </div>
  );
}
