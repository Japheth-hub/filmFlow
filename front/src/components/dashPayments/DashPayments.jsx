import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Button from '../button/Button'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function DashUsers({title, link, sid}) {
    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])

    const sendPayment = async (currentUserSid, amount) => {
        try {
            const res = await Swal.fire({
                icon: 'question',
                title: 'Pago realizado',
                text: `¿Estas seguro que deseas notificar al usuario que recibio ${amount}$ en su cuenta asociada?`,
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar',
            });
            if (res.isConfirmed) {   
            const payBody = {
                "auth": `${sid}`,
                "sid": `${currentUserSid}`
            }
            try {
                const paymentResponse = await axios.put(`${link}producer/pay`, payBody)
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: paymentResponse.data.message,
                });
                const updatedBody = body.filter(item => item.sid !== currentUserSid);
                setBody(updatedBody);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: error.response.data.message,
                });
            }
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        async function getData(body) {
            if (body && body.length > 0) {
                const objeto = body[0];
                const props = Object.keys(objeto);
                setColumn(props);
            } else {
                try {
                    const { data } = await axios.get(`${link}${sid}/?role=producers`);
                    const clearData = data.map((user) => ({
                        id: user.id,
                        name: user.name,
                        sid: user.sid,
                        email: user.email,
                        phone: user.phone,
                        payment_method: user.payment_method,
                        payment_account: user.payment_account,
                        payment_amount: user.payment_amount,
                    }));
    
                    const filteredData = clearData.filter(user => user.payment_amount !== null);
    
                    const objeto = filteredData[0];
                    const props = Object.keys(objeto);
                    setColumn(props);
                    setBody(filteredData);
                } catch (error) {
                    console.error("Error en la funcion showUsers de admin/page.jsx", error);
                }
            }
        }
        getData(body);
    }, [body]);

    return (
        <div>
            <h3 className={style.title}>{title}</h3>
            <div className={style.divTabla}>
                {column.length > 0 
                ? <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                {column && column.length > 0 &&
                                    column.map((item, index) => {
                                        return <th className={style.th} key={index}>{item.toUpperCase()}</th>
                                    })
                                }
                                <th className={style.th}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>
                                {body && body.length > 0 && column && column.length > 0 &&
                                    body.map((item, index) => (
                                        <tr key={index}>
                                        {column.map((prop, i) => ( 
                                                i === 0 
                                                ? <td className={style.td} key={i}>{item[prop]}</td>
                                                : <td className={style.td} key={i}>{item[prop]}</td>
                                                ))}
                                                <td className={style.td}>
                                                    <Button emoji={'💬'} color={'green'} callback={()=>{sendPayment(item.sid, item.payment_amount)}}></Button>
                                                </td>
                                        </tr>       
                                    ))
                                }
                        </tbody>
                    </table>
                :
                    <span className={style.welcome}>Bienvenido a tu Dashboard</span>
            }
            </div>
        </div>
    )
}
