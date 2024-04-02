import style from './about.module.scss'
const About =()=>{
    return(
        <div>
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
    )
}

export default About