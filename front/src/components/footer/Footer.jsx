
import style from './Footer.module.scss'
import Image from 'next/image';
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import logo from '../../img/logo-color-light-expanded.png';
import twt from '../../img/twitter.png'
import fb from '../../img/facebook.png'
import ig from '../../img/instagram.png'
import gh from '../../img/github.png'
const Footer = () => {

    const {user} = useUser();

    return (
        <div className={style.footer}>
            <div className="wrapper">
                <Image className={style.logo} src={logo} alt="" />
            </div>
            
            <div className={style.order}>
                <div>
                    <h4>Nuestra web</h4>
                    <ul className={style.noDecoration}>
                        <li>
                            <Link href='/'>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href='/filters/search='>
                                Peliculas
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link href="/account">
                                    Perfil
                                </Link>
                            ) : (
                                <a href="#">User</a>
                            )}
                        </li>
                        <li>
                            <Link href='/cart'>
                                Carrito de compras
                            </Link>
                            
                        </li>
                        <li>
                            <Link href='/about'>
                                Sobre nosotros
                            </Link>
                        </li>
                    </ul>
                    <h6>&#169; Todos los derechos reservados</h6>
                </div>
                <div>
                    <h4>Sociales</h4>
                    <Link href="#">
                        <Image src={fb} alt="facebook"/>
                    </Link>
                    <Link href="#">
                        <Image src={ig} alt="instagram"/>
                    </Link>
                    <Link href="#">
                        <Image src={twt} alt="twitter"/>
                    </Link>
                    <Link href="https://github.com/lukeskip/filmFlow"target="_blank">
                        <Image src={gh} alt="github"/>   
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Footer;