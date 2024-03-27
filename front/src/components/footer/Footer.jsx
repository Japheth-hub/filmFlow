
import style from './Footer.module.scss'
import Image from 'next/image';
import logo from '../../img/logo-color-light-expanded.png';
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
                        <li>Home</li>
                        <li>Movies</li>
                        <li>Users</li>
                        <li>Chart</li>
                        <li>About</li>
                    </ul>
                    <h6>&#169; Todos los derechos reservados</h6>
                </div>
                <div>
                    <h4>Institutional</h4>
                    <p className={style.institutional}>
                        Nuestra plataforma de películas ofrece una experiencia 
                        única, combinando lo mejor del cine con la última 
                        tecnología. 
                    </p>
                    <p className={style.institutional}>
                        Utilizamos tecnologías de vanguardia como Next.js 
                        y React para brindarte una interfaz intuitiva y
                        fluida.
                    </p>
                    <p className={style.institutional}>
                        Descubre nuevas películas y series de manera sencilla en 
                        nuestra plataforma.
                    </p>
                </div>
                <div>
                    <h4>Developers</h4>
                    <ul className={style.noDecoration}>
                        <li>Sergio García</li>
                        <li>Gerant Seminario</li>
                        <li>Japhet Ramírez</li>
                        <li>Marcos Pacheco</li>
                        <li>Candela Gómez</li>
                        <li>Nicolás Del Pozo</li>
                        <li>Julián Vega</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;