import React, {useEffect, useState} from 'react'
import style from '../../app/admin/admin.module.scss'
import Button from '../button/Button'
import axios from 'axios'
import Swal from 'sweetalert2';
import { showMovies, showReviews, showUsers, showOrder, showDiscount, showPurchases } from "@/helpers/dashboard";
import Loading from "@/components/loading/loading";
import ModalPromo from './modalPromo'
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link"; 

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL


export default function Dashboard({link, title, sid}) {
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
    const [update, setUpdate] = useState(true)
    const [codeType, setCodeType] = useState("default");
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
    const [display, setDisplay] = useState("none")
    const [placeholder, setPlaceholder] = useState("Buscar")
    const [rolType, setRolType] = useState("default");
    const porPagina = 10

    const { error, isLoading, user } = useUser();

    async function rolChange(sid, rolToChange) {
        try {
            if (user.sid === sid) {
                return Swal.fire({
                    icon: "warning",
                    title: "¡Advertencia!",
                    text: "No puedes cambiar tu propio rol",
                });
            }
            const res = await Swal.fire({
                icon: "question",
                title: "¿Estás seguro?",
                text: `Estas seguro que deseas convertir a ese usuario en ${rolToChange}`,
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "Cancelar",
            });
            if (res.isConfirmed) {
                const rolUpdateInfo = {
                    auth: `${user.sid}`,
                    userSid: `${sid}`,
                    roleToChange: `${rolToChange}`,
                };
                try {
                    const rolUpdateResponse = await axios.put(`${link}`, rolUpdateInfo);
                    Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: rolUpdateResponse.data.message,
                    });
                    const updatedBody = body.map((item) => {
                    if (item.sid === sid) {
                        return { ...item, rol: rolToChange };
                    }
                    return item;
                    });
                    setBody(updatedBody);
                } catch (error) {
                    Swal.fire({
                    icon: "error",
                    title: "¡Error!",
                    text: error.response.data.message,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    function limpiar(){
        setBody(body2)
        setSearch("")
        setSelectGenre("Genero");
        setStatus("Status")
        setPage(1)
        setRolType("default");
        setCodeType('default')
        setCurrentDate(new Date().toISOString().slice(0, 10))
    }

    async function handleOrder(tipo){
        setOrder(!order)
        setPage(1)
        setBody([...(await showOrder(order, tipo, body))]);
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
                setUpdate(!update)
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
                text: error || 'Ocurrió un error al eliminar la información.',
            });
        }
    }

    async function restoreAction(id){
        try {
            const res = await Swal.fire({
                icon: "warning",
                title: "¿Estás seguro?",
                text: "Estas seguro que deseas restaurar esta información",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "Cancelar",
            });

            if (res.isConfirmed) {
                let response = "";
                response = await axios.get(`${link}restore/${id}`)
                setUpdate(!update);
                Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: response.data.message,
                });
            }
            } catch (error) {
            Swal.fire({
                icon: "error",
                title: "¡Error!",
                text: error || "Ocurrió un error al eliminar la información.",
            });
        }
    }

    function handleGenre(e){
        const genero = e.target.value
        setSelectGenre(genero)
        const newBody = body2.filter((movie) => movie.genero.includes(genero))
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
            setBody(newBody)
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

    async function changeStatus(e, id){
        try {
            const status = e.target.value
            const res = await Swal.fire({
                icon: "warning",
                title: "¿Estás seguro?",
                text: "Estas seguro que deseas eliminar esta información",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "Cancelar",
            });
            if (res.isConfirmed) {
                const {data} = await axios.put(`${NEXT_PUBLIC_URL}movies/status/${id}`, {"auth": sid, "status": status})
                setUpdate(!update);
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "¡Error!",
                text: error.response.data.message || "Ocurrió un error al eliminar la información.",
            });
        }
    }

    function handleSearch(e){
        let search = []
        title === "Movies"  ? search = body2.filter((data) => data.nombre.toLowerCase().includes(e.target.value.toLowerCase())) : ""
        title === "Users"   ? search = body2.filter((data) => data.nombre.toLowerCase().includes(e.target.value.toLowerCase())) : ""
        title === "Reviews" ? search = body2.filter((data) => data.pelicula?.toLowerCase().includes(e.target.value.toLowerCase())) : ""
        title === 'Promos'
        ? search = body2.filter((data) => data.pelicula === "" 
            ? data.genero.toLowerCase().includes(e.target.value.toLowerCase())
            : data.pelicula.toLowerCase().includes(e.target.value.toLowerCase()))
        : "" 
        title === 'Ventas' ? search = body2.filter((data) => data.correo.toLowerCase().includes(e.target.value.toLowerCase())) : ""
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

    function masMenos(tipo){
        tipo ? page < totalPage ? setPage(page + 1) : setPage(page) : page > 1 ? setPage(page - 1) : setPage(page);
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

    function handleDiscount(e){
        setCodeType(e.target.value)
        handleDate(currentDate, e.target.value)

    }

    function handleDate(e, type){
        const date = e.target ? e.target.value : e
        setCurrentDate(date)
        let newBody = []
        switch(type){
            case 'start':
                    newBody = body2.filter((code) => code.inicio > date)
                    setBody(newBody)
                break
            case 'current':
                    newBody = body2.filter((code) => code.inicio <= date && code.fin >= date);
                    setBody(newBody);
                break
            case 'finished':
                    newBody = body2.filter((code) => code.fin < date)
                    setBody(newBody);
                break
            default:
                Swal.fire({
                icon: "warning",
                title: "Selecciona el tipo",
                text: "Por iniciar / Activas / Finalizadas",
            });
                break
        }
    }

    function handleRol(e){
        const rol = e.target.value
        const newBody = body2.filter((user) => user.rol === rol)
        if (newBody.length > 0) {
            setRolType(rol)
            setBody(newBody);
            setPage(1);
        } else {
            Swal.fire({
                icon: "info",
                title: "¡Información!",
                text: `No hay usuarios con este rol ${rol}`,
            });
        }
    }

    function showModal(display){
        setDisplay(display)
    }

    useEffect(()=>{
        async function datos(type){
            limpiar()
            let datos
            switch(type){
                case "Movies":
                    datos = await showMovies();
                    setPlaceholder("Buscar Pelicula ...")
                    break
                case "Users":
                    datos = await showUsers(sid);
                    setPlaceholder("Buscar Usuario ...");
                    break
                case "Reviews":
                    datos = await showReviews();
                    setPlaceholder("Buscar Pelicula ...");
                    break
                case "Ventas":
                    datos = await showPurchases(sid);
                    setPlaceholder("Buscar Email ...");
                    break
                case "Promos":
                    datos = await showDiscount();
                    setPlaceholder("Buscar Pelicula/Genero...");
                    break
                default :
                    break
            }
            setPage(1);
            getGenre();
            if(datos !== undefined){
                getData(datos)
                setTotalPage(Math.ceil(datos.length / porPagina));
                handlePagination(datos);
            } else {
                setBody([])
            }
        }
        datos(title)
        setSearch("")
    }, [title, update])
    
    useEffect(()=>{
        if(body){
            handlePagination(body);
            setTotalPage(Math.ceil(body.length / porPagina));
        }
    }, [page, body])

    if (isLoading){
        return <Loading />
    }

    return (
        <div>
            <h3 className={style.title}>{title}</h3>
            <div className={style.orderFilters}>
                <Button emoji={'🔄'} label={'Limpiar'} callback={()=>{limpiar()}}></Button>
                {title === "Users" && <Button callback={()=>{handleOrder('Role')}} emoji={order ? '🔻' : '🔺'} label={'Rol'}></Button>}
                {title === 'Reviews'
                ? (<>
                    <Button callback={()=>{handleOrder('Movie')}} emoji={order ? '🔻' : '🔺'} label={'Movie'}></Button>
                    <Button callback={()=>{handleOrder('Points')}} emoji={order ? '🔻' : '🔺'} label={'Points'}></Button>
                </>)
                    : title !== "Promos" && title !== 'Ventas' && <Button callback={()=>{handleOrder('Name')}} emoji={order ? '🔻' : '🔺'} label={'Nombre'}></Button>
                }
                {title === 'Ventas' && <Button callback={()=>{handleOrder('Amount')}} emoji={order ? '🔻' : '🔺'} label={'Montos'}></Button>}
                {title === 'Promos' && (<>
                    <Button callback={()=>{handleOrder('Percentage')}} emoji={order ? '🔻' : '🔺'} label={'Porcentaje'}></Button> 
                    <select className={style.status} defaultValue='default' value={codeType} onChange={handleDiscount}>
                        <option value="default" disabled>Selecciona tipo</option>
                        <option value="start">Por Iniciar</option>
                        <option value="current">Activas</option>
                        <option value="finished">Finalizadas</option>
                    </select>
                    <input className={style.calendar} type="date" id="fecha" name="fecha" value={currentDate} onChange={(e)=>{handleDate(e, codeType)}}/>
                </>)}
                {title === 'Users' && (<>
                    <select className={style.status} defaultValue='default' value={rolType} onChange={handleRol}>
                        <option value="default" disabled>Selecciona Rol</option>
                        <option value="viewer">Viewer</option>
                        <option value="producer">Producer</option>
                        <option value="admin">Admin</option>
                    </select>
                </>)}
                {title === 'Movies' && 
                    (<>
                        <Button callback={()=>{handleOrder('Duration')}} emoji={order ? '🔻' : '🔺'} label={'Duracion'}></Button>
                        <select className={style.status} name="status" onChange={handleStatus} defaultValue='Status' value={status}>
                            <option value="Status" disabled>Status</option>
                            <option value="approved">Aprobado</option>
                            <option value="pending">Pendiente</option>
                            <option value="declined">Declinado</option>
                        </select>
                        <select name="genre" className={style.genreSelect} defaultValue="Genero" value={selectGenre} onChange={handleGenre}>
                            <option value="Genero" disabled>Selecciona un genero</option>
                            {genres && genres.map((genre, index) => {
                                return <option key={index} value={genre}>{genre}</option>
                            })}
                        </select>
                    </>)}
                {title === "Promos" && <Link href='/discount'><Button label={"Crear Promo"} /*callback={()=>{showModal("block")}}*//></Link>}
                <input className={style.searchTable} type="text" onChange={handleSearch} placeholder={placeholder} value={search} />
            </div>
            <div className={style.paginado}>
                <button onClick={()=>{masMenos(false);}}>{'◀'}</button>
                <span>{`${page} de ${totalPage}`}</span>
                <button onClick={()=>{masMenos(true);}}>{'▶'}</button>
            </div>
            {body.length > 0 
                ?
                <div className={style.divTabla}>
                {column.length > 0 &&
                <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                {column && column.length > 0 &&
                                    column.map((item, index) => {
                                        return item !== "id" && <th className={style.th} key={index}>{item.toUpperCase()}</th>
                                    })
                                }
                                {title !== 'Ventas' && <th className={style.th}>ACTIONS</th>}
                            </tr>
                        </thead>
                        <tbody className={style.tbody}>
                                {body.length > 0 
                                    ? pagina && pagina.length > 0 && column && column.length > 0 &&
                                    pagina.map((item, index) => (
                                            <tr key={index}>
                                            {column.map((prop, i) => ( 
                                                    prop !== "id"  && (
                                                        title === "Movies" && prop === 'status'
                                                        ? (<td key={i}>
                                                        <select className={style[item[prop]]} name="status" onChange={(e)=>{changeStatus(e, item.id)}} defaultValue={item[prop]} value={item[prop]}>
                                                            <option value="approved">Aprobado</option>
                                                            <option value="pending" disabled>Pendiente</option>
                                                            <option value="declined">Declinado</option>
                                                        </select>
                                                    </td>)
                                                    : <td className={style.td} key={i}>{item[prop]}</td> && title === "Movies" && prop === "name" ? <td className={style.td} key={i}><Link href={`detail/${item.id}`}>{item[prop]}</Link></td> : <td className={style.td} key={i}>{item[prop]}</td>
                                                )))}
                                                    { title !== "Ventas" && 
                                                        <td className={style.td}>
                                                            <div className={style['btn-actions']}>
                                                                {title === "Promos"
                                                                ? <Button emoji={'🗑️'} label={''} color={'red'} callback={()=>{deleteAction(item.id)}}></Button>
                                                                : item.eliminado === "Active"
                                                                    ? <Button emoji={'🗑️'} label={''} color={'red'} callback={()=>{deleteAction(item.id)}}></Button>
                                                                    : <Button emoji={'✅'} label={''} color={'green'} callback={()=>{restoreAction(item.id)}}></Button>
                                                                }
                                                                {title === "Users" && item.rol !== "viewer" && <Button emoji={'🚷'} label={''} color={'red'} callback={()=>{rolChange(item.sid, "viewer")}}></Button>}
                                                                {title === "Users" && item.rol !== "admin" && <Button emoji={'🛡️'} label={''} color={'yellow'} callback={()=>{rolChange(item.sid, "admin")}}></Button>}
                                                            </div>
                                                        </td>
                                                    }
                                            </tr>       
                                        ))
                                    
                                        : <tr className={style.tr}><td className={style.tdDefault} colSpan={column.length + 1}>No hay Datos por mostrar</td></tr>
                                }
                        </tbody>
                    </table>
            }
            </div>
            : <h5 className={style.welcome}>No hay Datos por Mostrar</h5>
        }
            {/* {title === 'Promos' &&
                <div className={style.modalContainer} style={{display : display}}>
                    <ModalPromo showModal={showModal}/>
                </div>
            } */}
        </div>
    )
}
