import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';
import styles from './Navbar.module.scss'
import logoimg from '../../img/logo-white-expanded.png';
import userpic from '../../img/userpic.png'
import cart from '../../img/shopping-cart.png'
import { UseUser, useUser } from '@auth0/nextjs-auth0/client'
import Button from '../../components/button/Button'
import { useRouter } from 'next/navigation';

const Nav = (props)=> {

    const {data} = props;
    const {user} = useUser();
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);
    const [search,setSearch] = useState("");

    const handleAccountClick = () => {
      setShowDropdown(!showDropdown);
    };

    const handleSubmit = ()=>{
        router.push(`/filters/search?s=${search}`);
    }

    return(
        <nav className={styles.nav}>
            <div className="wrapper">
                <ul className={styles.navList}>
                    <div>
                        
                        <li>
                            <Link href ='/home'>
                                
                                <Image className={styles.logo} src={logoimg} alt="Logo" />
                                
                            </Link>
                        </li>

                    </div>
                    

                    <div className={styles.searchBar}>
                    <li >
                        <input type="text" placeholder="Search" value={search} onChange={(event)=>setSearch(event.target.value)}/>
                        <span className={styles.searchButton} onClick={handleSubmit}>🔎</span>
                        
                    </li> 
                    </div>
                    

                    
                    <div className={styles.toRight}> 
                        <li >
                            <Image src={cart} alt="Cart" width={30} height={30} />
                        </li>

                        <li >
                            <Image src={userpic} alt="Account" width={30} height={30} onClick={handleAccountClick} />
                                {showDropdown && (
                                <div className={styles.dropdown}>

                                    <ul>

                                    <li>
                                        <Link href="#">
                                            My Account
                                        </Link>
                                    </li>

                                    <li> 
                                        <Link href="/form">
                                            Form
                                        </Link>
                                    </li>

                                    <li>
                                        {user ? <a href="/api/auth/logout"><button>Log out</button></a> : ""}
                                    </li>

                                    </ul>
                                </div>
                            )}
                        </li>   
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Nav