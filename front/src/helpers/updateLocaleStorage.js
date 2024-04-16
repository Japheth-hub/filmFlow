import axios from 'axios'
const URL = process.env.NEXT_PUBLIC_URL

export const updateLocaleStorage = async(user) => {
        try {
            const { data } = await axios.post(`${URL}users`, user)   
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(
                        'FilmFlowUsr', JSON.stringify({...user, role:data.role}),
                    )
                }
                return JSON.parse(window.localStorage.getItem('FilmFlowUsr'))
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }