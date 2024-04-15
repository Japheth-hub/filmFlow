import React, { useState, useEffect } from "react";
import style from './modal.module.scss';
import PhoneInput from 'react-phone-number-input';
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from 'sweetalert2';
import Modal2 from "./modal2";
import 'react-phone-number-input/style.css'

const Modal = ({ isOpen, onClose }) => {
    const {user} = useUser();
    const userSid = user.sid;
    const userEmail = user.email;

    const [formData, setFormData] = useState({
        auth: userSid,
        paymentMethod: "",
        paymentAccount: userEmail,
        phoneNumber: ""
    });
console.log(formData)
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleCloseAllModals = () => {
      onClose();
      setShowSecondModal(false); 
    };

    useEffect(() => {
        const isFormValid = formData.paymentMethod !== "" && confirmEmail &&  formData.phoneNumber !== "";
        setIsButtonDisabled(!isFormValid);
    }, [formData.paymentMethod, confirmEmail, formData.phoneNumber]);

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
                Swal.fire(
                    '¡Correo confirmado!',
                    '',
                    'success'
                );
            } else {
                setFormData({
                    ...formData,
                    paymentAccount: '' 
                });
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className={style["modal"]}>
            <div className={style["modal-content"]}>
                <span className={style["close"]} onClick={onClose}>&times;</span>
                <form>
                    <div className={style["form-group"]}>
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
                    </div>
                    <div className={style["form-group"]}>
                        <label htmlFor="paymentAccount">Cuenta de pago:</label>
                        <input
                            type="text"
                            id="paymentAccount"
                            name="paymentAccount"
                            value={formData.paymentAccount}
                            onChange={handleChange}
                            disabled={confirmEmail}
                        />
                        {!confirmEmail && (
                            <button type="button" onClick={handleConfirmEmail}>Confirmar correo</button>
                        )}
                    </div>
                    <div className={style["form-group"]}>
                        <label htmlFor="phoneNumber">Número de teléfono:</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={(phoneNumber) => setFormData({ ...formData, phoneNumber })}
                        />
                    </div>
                    <div className={style["form-groups"]}>
                    <button
                        type="button"
                        onClick={() => setShowSecondModal(true)}
                        className={`${style["button"]} ${isButtonDisabled ? style["button-disabled"] : style["button-primary"]}`}
                        disabled={isButtonDisabled || formData.phoneNumber === ""}
                    >
                        Ver terminos y condiciones
                    </button>
                        {showSecondModal && <Modal2 formData={formData} onClose={handleCloseAllModals} user={user}/>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
