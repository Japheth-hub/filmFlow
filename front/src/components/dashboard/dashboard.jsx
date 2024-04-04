import React, {useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Link from 'next/link'


export default function Dashboard({movies, users, purchases}) {

    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])
    const [link, setLink] = useState("/detail")//Mejroar la parte de la redirrecion, por ahora solo nos lleva al detail de la movie

    function handleTable(datos){
        if(datos && datos.length > 0){
            const objeto = datos[0]
            const props = Object.keys(objeto);
            setColumn(props)
        } else {
            setColumn([])
        }
        setBody(datos)

    }

    // console.log('users', users)
    // console.log('movies', movies)
    // console.log('compras', purchases)
    // console.log(column)
    // console.log(body)
    
  return (
    <div>

        <button onClick={()=>{handleTable(movies)}}>Movies</button>
        <button onClick={()=>{handleTable(users)}}>Users</button>
        <button onClick={()=>{handleTable(purchases)}}>Purchases</button>

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
