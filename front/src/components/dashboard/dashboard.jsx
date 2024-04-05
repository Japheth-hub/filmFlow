import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Link from 'next/link'
import Button from '../button/Button'
import axios from 'axios'


export default function Dashboard({datos, link}) {

    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])

    async function deleteAction(id){
        try {
            const {data} = await axios.delete(`${link}${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
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
                                            ? <td className={style.td} key={i}><Link href={`${link}/${item[prop]}`}>{item[prop]}</Link></td>
                                            : <td className={style.td} key={i}>{item[prop]}</td>
                                            ))}
                                            <td className={style.td}>
                                                <Button emoji={'🗑️'} label={'Delete'} color={'red'} callback={()=>{deleteAction(item.id)}}></Button><br />
                                                <Button emoji={'✏️'} label={'Edit'} color={'blue'}></Button>
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
