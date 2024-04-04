'use client'
import React,  {useEffect, useState} from 'react'
import Dashboard from '@/components/dashboard/dashboard'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

function Admin() {

  const {user, isLoading, error} = useUser()
  const [stop, setStop] = useState(true)
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [purchases, setPurchases] = useState([])

  
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
    setMovies(clearData)
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
    setPurchases(clearData)
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
    setUsers(clearData)
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

  if(user){
      return (
        <div>
          <Dashboard movies = {movies} users = {users} purchases={purchases}/>
        </div>
    )
  }
}

export default Admin