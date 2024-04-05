'use client'
import React,  {useEffect, useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useParams } from 'next/navigation'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

function Admin() {

  const {tipo} = useParams()
  const {user, isLoading, error} = useUser()
  const [stop, setStop] = useState(true)
  const [datos, setDatos] = useState([])
  const [link, setLink] = useState("")

  
  async function getMovies(data){
    const clearData = data.map((movie)=>{
      return {
        id: movie.id,
        name: movie.name,
        duration: movie.duration,
        status: movie.status,
        userId: movie.userId,
        price: movie.price,
        genre: movie.genres.map((genero) => genero.name).join("/")
      }
    })
    if(tipo === "movies"){
      setDatos(clearData)
      setLink("http://localhost:3001/movies/")
    }
  }
  
  async function getPurchases (data){
    const clearData = data.map((purch) => {
      return {
        id: purch.id,
        stripeId: purch.stripeId,
        status: purch.status,
        method: purch.method,
        currency: purch.currency,
        amount: purch.amount,
        userId: purch.userId,
        createdAt: purch.createdAt.slice(0, 10)
      }
    })
    if(tipo === "purchases"){
      setDatos(clearData)
    }
  }
  
  async function getUsers (data){
    const clearData = data.map((user) => {
      return {
        name: user.name,
        email: user.email,
        role: user.roleId,
        sid: user.sid,
        created: user.createdAt.slice(0, 10),
        deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : ""
      }
    })
    if(tipo === "users"){
      setDatos(clearData)
      setLink("http://localhost:3001/users/")
    }
  }
  
  async function getData(){
    try {
      const {data} = await axios(`${NEXT_PUBLIC_URL}dashboard/${user.sid}`)
      const {movies, users, purchases} = data
      await getMovies(movies)
      await getUsers(users)
      await getPurchases(purchases)
      setStop(false)
    } catch (error) {
      console.log(error)
      setStop(false)
    }
  }
  
  if(stop && user){
    getData()
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
  // console.log(movies)
  // console.log(users)
  // console.log(purchases)
  if(user){
    return (<>
        <div>
          <Dashboard datos = {datos} link = {link}/>
        </div>
      </>
    )
  }
}

export default Admin