import React from "react";
import style from './modal.module.scss';
import Swal from 'sweetalert2';
import axios from 'axios';

const Modal2 = ({ formData, onClose, user }) => {
    const URL = process.env.NEXT_PUBLIC_URL;

    const handleAcceptTerms = async () => {
        Swal.fire({
            title: '¿Estás seguro de aceptar los términos y condiciones?',
            text: 'Al aceptar, confirmas que has leído y aceptado los términos y condiciones.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${URL}users/producer`, formData);
                    if(user){
                        const upUser = async() => {
                            try {
                                const { data } = await axios.post(`${URL}users`, user)
                                if (typeof window !== 'undefined') {
                                    window.localStorage.setItem(
                                        'FilmFlowUsr', JSON.stringify({...user, role:data.role})
                                    )
                                } 
                            } catch (error) {
                                console.error("Error updating user:", error);
                            }
                        }
                        upUser()
                    }
                    onClose();
                    Swal.fire(
                        '¡Datos enviados!',
                        'Los datos han sido enviados correctamente.',
                        'success'
                    ).then(location.reload());
                } catch (error) {
                    console.error("Error al enviar datos:", error);
                    Swal.fire(
                        '¡Error!',
                        'Ha ocurrido un error al enviar los datos. Por favor, inténtalo de nuevo más tarde.',
                        'error'
                    );
                }
            }
        });
    };
    

    return (
        <div className={style["modal"]}>
            <div className={style["modal-content"]}>
                <span className={style["close"]} onClick={onClose}>&times;</span>
                <h2>Terminos y Condiciones</h2>
                <div className={style["modal-text-container"]}>
                <p className={style["modal-text"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Praesent scelerisque, massa non lacinia congue, elit arcu ullamcorper lacus, ac ultricies justo odio sit amet nibh. Nunc accumsan, ipsum sed dignissim feugiat, risus nisl egestas massa, in pulvinar neque leo ac lectus. Fusce aliquam risus sit amet sapien venenatis, eget aliquam risus tincidunt.
                <p className={style["modal-text"]}>
                Mauris sit amet nibh vulputate, eu hendrerit nibh ultrices. Maecenas sit amet risus velit. Cras ullamcorper massa sit amet lacus egestas, ac ultrices nisi tincidunt. Maecenas sit amet lacus euismod, aliquam lectus quis, ultrices nisi. Fusce eget nibh vulputate, eu hendrerit nibh ultrices. Maecenas sit amet risus velit. Cras ullamcorper massa sit amet lacus egestas, ac ultrices nisi tincidunt.
                </p>
                <p className={style["modal-text"]}></p>
                Vivamus at neque risus. Praesent eu leo eget massa ultricies egestas. Nam venenatis risus ac neque hendrerit, quis tincidunt dui ultrices. Suspendisse potenti. Fusce aliquet enim at nibh euismod, eu hendrerit nibh ultrices. Maecenas sit amet risus velit. Cras ullamcorper massa sit amet lacus egestas, ac ultrices nisi tincidunt.
                </p>
                <button className={style["modal-button"]} type="button" onClick={handleAcceptTerms}>Aceptar términos y condiciones</button>
            </div>
            </div>
        </div>
    );
};

export default Modal2;
