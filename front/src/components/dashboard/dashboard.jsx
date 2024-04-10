import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Link from 'next/link'
import Button from '../button/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL


export default function Dashboard({datos, link, title, sid}) {
    const [column, setColumn] = useState([])
    const [body, setBody] = useState([])
    const [body2, setBody2] = useState([])
    const [order, setOrder] = useState(true)
    const [genres, setGenres] = useState([])
    const [search, setSearch] = useState("")
    const [selectGenre, setSelectGenre] = useState("Genero");
    const [status, setStatus] = useState("Status")
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [pagina, setPagina] = useState([])
    const porPagina = 10

    function limpiar(){
        setBody(body2)
        setSearch("")
        setSelectGenre("Genero");
        setStatus("Status")
        setPage(1)
        body.sort((a, b) => a.id - b.id)
    }

    function handleOrder(tipo){
        setOrder(!order)
        setPage(1)
        if(tipo === 'Name'){
            if(!order){
                const newBody = body.sort((a, b) => a.name.localeCompare(b.name));
                setBody([...newBody])
            } else {
                const newBody = body.sort((a, b) => b.name.localeCompare(a.name));
                setBody([...newBody]);
            }
        } else if(tipo === 'Duration'){
            if(!order){
                const newBody = body.sort((a, b) => b.duration - a.duration);
                setBody([...newBody]);
            } else {
                const newBody = body.sort((a, b) => a.duration - b.duration);
                setBody([...newBody]);
            }
        } else if(tipo === 'Movie'){
            if(!order){
                const newBody = body.sort((a, b) => a.movie.localeCompare(b.movie));
                setBody([...newBody]);
            } else {
                const newBody = body.sort((a, b) => b.movie.localeCompare(a.movie));
                setBody([...newBody]);
            }
        } else if(tipo === 'Points'){
            if(!order){
                const newBody = body.sort((a, b) => b.points - a.points);
                setBody([...newBody]);
            } else {
                const newBody = body.sort((a, b) => a.points - b.points);
                setBody([...newBody]);
            }
        }
    }

    async function deleteAction(id){
        try {
            const res = await Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro?',
                text: 'Estas seguro que deseas eliminar esta información',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar',
              });
        
              if (res.isConfirmed) {
                let response = '';
                title !== 'Users' ? (response = await axios.delete(`${link}${id}`)) : (response = await axios.delete(`${link}${id}/${sid}`));
                const newBody = body2.filter((data) => data.id !== id);
                setBody(newBody);
                setBody2(newBody);
                Swal.fire({
                  icon: 'success',
                  title: '¡Éxito!',
                  text: response.data.message,
                });
              }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.response.data.message || 'Ocurrió un error al eliminar la información.',
              });
        }
    }

    //functions Movies*---------------------------------------------------------------
    function handleGenre(e){
        const genero = e.target.value
        setSelectGenre(genero)
        const newBody = body2.filter((movie) => movie.genre.includes(genero))
        if(newBody.length === 0 || !newBody){
            Swal.fire({
                icon: 'info',
                title: '¡Información!',
                text: 'No hay películas con este género',
              });
        } else {
            setBody(newBody)
            setPage(1);
        }
    }
    function handleStatus(e){
        const status = e.target.value
        const newBody = body2.filter((movie) => movie.status === status)
        if(newBody.length > 0){
            setStatus(status)
            setPage(1);
        } else {
            Swal.fire({
                icon: 'info',
                title: '¡Información!',
                text: `No hay películas con el status ${status}`,
                });
        }
    }
    //--------------------------------------------------------------------------------

    function handleSearch(e){
        let search = []
        title === 'Reviews' 
        ? search = body2.filter((data) => data.movie.toLowerCase().includes(e.target.value.toLowerCase()))
        : search = body2.filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if(search.length > 0){
            setSearch(e.target.value)
            setBody(search)
            setPage(1);
        }else {
            Swal.fire({
                icon: 'info',
                title: '¡Información!',
                text: 'No hay películas que coincidan con tu búsqueda',
                });
        }
    }


    function menos(){
        if(page > 1){
            setPage(page - 1)
        }
    }

    function mas(){
        if(page < totalPage){
            setPage(page + 1)
        }
    }
    
    function handlePagination(body) {
        const offset = (page - 1) * porPagina;
        const limit = offset + porPagina;
        const data = body.slice(offset, limit);
        setPagina(data);
    }

    function getData(datos) {
        if (datos && datos.length > 0) {
            const objeto = datos[0];
            const props = Object.keys(objeto);
            setColumn(props);
            setBody(datos);
            setBody2(datos);
        } else {
            setColumn([]);
        }
    }

    async function getGenre(){
        try {
            const {data} = await axios(`${NEXT_PUBLIC_URL}genres`)
            const genre = data.map((genre) => genre.name)
            setGenres(genre)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.response.data.message || 'Ocurrió un error al obtener los géneros.',
                });
        }
    }
    
    useEffect(()=>{
        if(body){
            handlePagination(body);
            setTotalPage(Math.ceil(body.length / porPagina));
        }
    }, [page, body])

    useEffect(()=>{
        setPage(1);
        getGenre()
        getData(datos)
        setTotalPage(Math.ceil(datos.length/porPagina))
        handlePagination(datos);
    }, [datos])

  return (
    <div>
        <h3 className={style.title}>{title}</h3>
        <div className={style.orderFilters}>
            <Button emoji={'🔄'} label={'Limpiar'} callback={()=>{limpiar()}}></Button>
            {title === 'Reviews'
                ? (<>
                    <Button callback={()=>{handleOrder('Movie')}} emoji={order ? '🔻' : '🔺'} label={'Movie'}></Button>
                    <Button callback={()=>{handleOrder('Points')}} emoji={order ? '🔻' : '🔺'} label={'Points'}></Button>
                    </>)
                : <Button callback={()=>{handleOrder('Name')}} emoji={order ? '🔻' : '🔺'} label={'Name'}></Button>
            }
            {title === 'Movies' && (<>
              <Button callback={()=>{handleOrder('Duration')}} emoji={order ? '🔻' : '🔺'} label={'Duration'}></Button>
              <select className={style.status} name="status" onChange={handleStatus} defaultValue='Status' value={status}>
                  <option value="Status" disabled>Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
              </select>
              <select name="genre" className={style.genreSelect} defaultValue="Genero" value={selectGenre} onChange={handleGenre}>
                  <option value="Genero">Selecciona un genero</option>
                  {genres && genres.map((genre, index) => {
                      return <option key={index} value={genre}>{genre}</option>
                  })}
              </select>
            </>)}
            <input className={style.searchTable} type="text" onChange={handleSearch} placeholder='Search...' value={search} />
        </div>

        <div className={style.paginado}>
            <button onClick={()=>{menos()}}>{'◀'}</button>
            <span>{`${page} de ${totalPage}`}</span>
            <button onClick={()=>{mas()}}>{'▶'}</button>
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
                            {pagina && pagina.length > 0 && column && column.length > 0 &&
                                pagina.map((item, index) => (
                                    <tr key={index}>
                                    {column.map((prop, i) => ( 
                                            i === 0 
                                            ? <td className={style.td} key={i}>{item[prop]}</td>
                                            : <td className={style.td} key={i}>{item[prop]}</td>
                                            ))}
                                            <td className={style.td}>
                                                <Button emoji={'🗑️'} label={'Delete'} color={'red'} callback={()=>{deleteAction(item.id)}}></Button><br />
                                                {/* <Button emoji={'✏️'} label={'Edit'} color={'blue'}></Button> */}
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
