import React, {useState} from 'react'

export default function Dashboard({movies, users}) {

    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])//Continuamos con el llenado del body de la tabla

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

    // console.log(users)
    // console.log(movies)
    // console.log(column)
    // console.log(body)
    
  return (
    <div>

        <button onClick={()=>{handleTable(movies)}}>Movies</button>
        <button onClick={()=>{handleTable(users)}}>Users</button>
        <button onClick={()=>{handleTable(users)}}>Providers</button>

        <table border='1'>
            <thead>
                <tr>
                    {column && column.length > 0 &&
                        column.map((item, index) => {
                            return <th key={index}>{item}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                    {body && body.length > 0 && column && column.length > 0 &&
                        body.map((item, index) => (
                            <tr key={index}>
                            {column.map((prop, i) => ( 
                                    <td key={i}>{item[prop]}</td>
                                    ))}
                            </tr>       
                        ))
                    }
            </tbody>
        </table>
    </div>
  )
}
