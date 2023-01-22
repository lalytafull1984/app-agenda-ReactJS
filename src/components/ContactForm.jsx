import React from "react";
import PropTypes from "prop-types";
import { Contact } from "../models/contactClass";
import { useRef } from "react";

function ContactForm({ add, length }) {
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  function addContact(e) {
    e.preventDefault();
    const newContact = new Contact(
      nameRef.current.value,
      phoneRef.current.value,
      emailRef.current.value
    );

    add(newContact);
    let form = document.getElementById("contactForm")
    form.reset()
    
  }

  return (
    <div className="col-md-4 mx-auto">
      <form id="contactForm" onSubmit={addContact}>
        <div className="mb-3">
          <input
            placeholder="Nombre"
            ref={nameRef}
            type="text"
            className="form-control text-primary fillRequired"
            id="Name"
            name="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Teléfono"
            ref={phoneRef}
            type="text"
            className="form-control text-primary"
            id="Phone"
            name="Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Email"
            ref={emailRef}
            type="email"
            className="form-control text-primary"
            id="Email"
            name="Email"
            required
          />
        </div>
        <button id="create" type="submit" className="btn btn-primary">
          Añadir Contacto
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  add: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired
};

export default ContactForm;
