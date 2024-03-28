
import style from './Footer.module.scss'
import Image from 'next/image';
import logo from '../../img/logo-color-light-expanded.png';
const Footer = () => {
    console.log(logo);
    return (
        <div className={style.footer}>
            <div className="wrapper">
                <Image className={style.logo} src={logo} alt="" />
            </div>
        </div>
    )
}

export default Footer;