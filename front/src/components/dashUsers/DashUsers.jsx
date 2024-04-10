import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Button from '../button/Button'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'; 
import Swal from 'sweetalert2'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL


export default function DashUsers({datos, link}) {
    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])
    const [order, setOrder] = useState(true)
    // const [orderByRole, setOrderByRole] = useState(false);

    const {user} = useUser();

    async function rolChange(sid, rolToChange){
        try {
            if (user.sid === sid) {
                return Swal.fire({
                    icon: 'warning',
                    title: '¡Advertencia!',
                    text: 'No puedes cambiar tu propio rol',
                  });
            }
            
            const res = await Swal.fire({
                icon: 'question',
                title: '¿Estás seguro?',
                text: `Estas seguro que deseas convertir a ese usuario en ${rolToChange}`,
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar',
              });
          
                if (res.isConfirmed) {        
                const rolUpdateInfo = {
                "auth": `${user.sid}`,
                "userSid": `${sid}`,
                "roleToChange": `${rolToChange}`
                };
                try {
                    const rolUpdateResponse = await axios.put(`${link}`, rolUpdateInfo);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: rolUpdateResponse.data.message,
                    });
                    const updatedBody = body.map((item) => {
                        if (item.sid === sid) {
                        return { ...item, role: rolToChange };
                        }
                        return item;
                    });
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
            console.log(error)
        }
    }
    function handleOrder(tipo) {
        let sortedBody = [...body]; // Crear una copia del estado actual de body
    
        if (tipo === 'Name') {
          setOrder(!order);
          if (!order) {
            sortedBody.sort((a, b) => a.name.localeCompare(b.name));
          } else {
            sortedBody.sort((a, b) => b.name.localeCompare(a.name));
          }
        } else if (tipo === 'Role') {
          setOrder(!order);
          if (!order) {
            sortedBody.sort((a, b) => a.role.localeCompare(b.role));
          } else {
            sortedBody.sort((a, b) => b.role.localeCompare(a.role));
          }
        }
    
        setBody(sortedBody); // Actualizar el estado de body con el nuevo orden
      }
    
    useEffect(()=>{
        function getData(datos){
            if(datos && datos.length > 0){
                const objeto = datos[0]
                const props = Object.keys(objeto);
                setColumn(props)
                setBody(datos)
            } else {
                setColumn([])
            }
        }
        getData(datos)
    }, [datos])

  return (
    <div>
        <div className={style.orderFilters}>
            <Button callback={()=>{handleOrder('Name')}} emoji={order ? '🔻' : '🔺'} label={'Name'}></Button>
            <Button callback={()=>{handleOrder('Role')}} emoji={order ? '🔻' : '🔺'} label={'Role'}></Button>
            
        </div>

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
                                                { item.role !== "admin" && item.role !== "producer" && ( <Button emoji={'🎬'} label={'Convertir en producer'} color={'purple'} callback={()=>{rolChange(item.sid, "producer")}}></Button> )}<br />
                                                { item.role !== "admin" && ( <Button emoji={'🛡️'} label={'Convertir en admin'} color={'red'} callback={()=>{rolChange(item.sid, "admin")}}></Button> )}<br />
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
