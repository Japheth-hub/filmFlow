'use client'
import React,  {useEffect, useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'

function Admin() {

  const {user, isLoading, error} = useUser()
  const [stop, setStop] = useState(true)
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [rol, setRol] = useState([])

  async function getMovies(){
    const {data} = await axios('http://localhost:3001/movies')
    const clearData = data.map((movie)=>{
      return {
        id: movie.id,
        name: movie.name,
        duration: movie.duration,
        country: movie.country,
        status: movie.status,
        userId: movie.userId,
        price: movie.price,
        genre: movie.genres.map((genero) => genero.name).join("/")
      }
    })
    setMovies(clearData)
  }

  async function getUsers(){
    const {data} = await axios(`http://localhost:3001/users/${user.sid}`)
    const clearData = data.users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        role: user.roleId,
        sid: user.sid,
        created: user.createdAt.slice(0, 10),
        deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : ""
      }
    })
    setUsers(clearData)
  }

  // async function getRol(){
  //   obtener los roles
  // }

  async function getFetch(){
    await getMovies()
    await getUsers()
    setStop(false)
  }
  
  if(stop && user){
    getFetch()
  }


  if(error){
    return (
      <div>Error con auth0</div>
    )
  }
  if(isLoading){
    return (
      <div>Loading....</div>
    )
  }
  if(user){
      return (
        <div>
        <Dashboard movies = {movies} users = {users}/>
      </div>
    )
  }
}

export default Admin