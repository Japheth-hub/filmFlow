
import style from './Footer.module.scss'
import Image from 'next/image';
import Link from 'next/link'
import logo from '../../img/logo-color-light-expanded.png';
import twt from '../../img/twitter.png'
import fb from '../../img/facebook.png'
import ig from '../../img/instagram.png'
import gh from '../../img/github.png'
const Footer = () => {
    return (
        <div className={style.footer}>
            <div className="wrapper">
                <Image className={style.logo} src={logo} alt="" />
            </div>
            
            <div className={style.order}>
                <div>
                    <h4>Site Map</h4>
                    <ul className={style.noDecoration}>
                        <li>
                            <Link href='/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/filters/search='>
                                Movies
                            </Link>
                        </li>
                        <li>
                            <Link href='#'>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link href='/cart'>
                                Shopping cart
                            </Link>
                            
                        </li>
                        <li>
                            <Link href='/about'>
                                About
                            </Link>
                        </li>
                    </ul>
                    <h6>&#169; Todos los derechos reservados</h6>
                </div>
                <div>
                    <h4>Socials</h4>
                    <Link href="#">
                        <Image src={fb} alt="facebook"/>
                    </Link>
                    <Link href="#">
                        <Image src={ig} alt="instagram"/>
                    </Link>
                    <Link href="#">
                        <Image src={twt} alt="twitter"/>
                    </Link>
                    <Link href="https://github.com/lukeskip/filmFlow">
                        <Image src={gh} alt="github"/>   
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Footer;