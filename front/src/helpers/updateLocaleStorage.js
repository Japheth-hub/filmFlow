import axios from 'axios'
const URL = process.env.NEXT_PUBLIC_URL

export const updateLocaleStorage = (user) => {
    const upUser = async() => {
        try {
            const { data } = await axios.post(`${URL}users`, user)   
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(
                        'FilmFlowUsr', JSON.stringify({...user, role:data.role})
                    )
                } 
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
    upUser()
}