import React, { useState } from "react";
import style from './modal.module.scss';
import axios from 'axios';
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from 'sweetalert2';


const Modal = ({ isOpen, onClose }) => {
    const {user} = useUser();
    const userSid = user.sid;
    const userEmail= user.email;

    const URL = process.env.NEXT_PUBLIC_URL;
    const [formData, setFormData] = useState({
    auth: userSid,
    paymentMethod: "",
    paymentAccount: userEmail,
    phoneNumber: ""
  });
  
  const [confirmEmail, setConfirmEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmEmail = () => {
    Swal.fire({
        title: '¿Estás seguro de que este es tu correo electrónico?',
        text: "Una vez confirmado, no podrás cambiarlo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            setConfirmEmail(true);
            document.getElementById("paymentAccount").disabled = true;
            document.getElementById("submitBtn").disabled = false;
            Swal.fire(
                '¡Correo confirmado!',
                '',
                'success'
            );
        } else {
            setFormData({
                ...formData,
                paymentAccount: '' // Limpiar el campo del correo electrónico
            });
        }
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`${URL}users/producer`, formData);
        onClose(); // Cierra la ventana modal después de enviar los datos
        Swal.fire(
            '¡Datos enviados!',
            'Los datos han sido enviados correctamente.',
            'success'
        );
    } catch (error) {
        console.error("Error al enviar datos:", error);
        Swal.fire(
            '¡Error!',
            'Ha ocurrido un error al enviar los datos.',
            'error'
        );
    }
};

  if (!isOpen) return null;

  return (
    <div className={style["modal"]}>
      <div className={style["modal-content"]}>
        <span className={style["close"]} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="paymentMethod">Método de pago:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="zelle">ZELLE</option>
            <option value="binance">BINANCE</option>
            <option value="paypal">PAYPAL</option>
          </select>
          <label htmlFor="paymentAccount">Cuenta de pago:</label>
          <input
            type="text"
            id="paymentAccount"
            name="paymentAccount"
            value={formData.paymentAccount}
            onChange={handleChange}
          />
          {!confirmEmail ? (
            <button type="button" onClick={handleConfirmEmail}>Confirmar correo</button>
          ) : (
            <p>Correo confirmado</p>
          )}
          <label htmlFor="phoneNumber">Número de teléfono:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <button id="submitBtn" type="submit" disabled={!confirmEmail}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
