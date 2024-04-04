import style from './about.module.scss'
import Link from 'next/link'

const About =()=>{
    return(
        <div className={style.about}>
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

            <div >
                <h4>Developers</h4>
                <ul className={style.noDecoration}>
                    <li>
                        <Link href='https://github.com/lukeskip'>
                            Sergio García
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/Baideweii'>
                            Gerant Seminario
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/Japheth-hub'>
                            Japhet Ramírez
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/O-oyuco'>
                            Marcos Pacheco
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/cngomez18'>
                            Candela Gómez
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/NDelPozo'>
                            Nicolás Del Pozo
                        </Link>
                    </li>
                    <li>
                        <Link href='https://github.com/julianfv1150'>
                            Julián Vega
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default About