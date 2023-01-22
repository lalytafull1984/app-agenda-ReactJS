import React from 'react'
import PropTypes from 'prop-types'
import { Contact } from '../models/contactClass'

const ContactComponent = ({contact, remove}) => {

    return (
        <tr>
            <th>{ contact.cName }</th>
            <td>{ contact.cPhone}</td>
            <td>{ contact.cEmail }</td>
            <td><button className="btn btn-sm btn-primary" onClick={() => remove(contact) }>Borrar</button></td>
        </tr>
    )
}

ContactComponent.propTypes = {
    contact: PropTypes.instanceOf(Contact).isRequired,
    remove: PropTypes.func.isRequired
}

export default ContactComponent