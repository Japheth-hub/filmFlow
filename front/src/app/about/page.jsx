'use client'
import style from './about.module.scss'
import Link from 'next/link';
import gh from '../../img/github.png';
import linkedIn from '../../img/linkedin.png';
import Image from 'next/image';
import developers from '@/utils/developers.js'

import { useEffect } from 'react';

const About = ()=>{
    useEffect(() => {
      console.log(developers.length);
      
    }, [])
    
    return(
        <div className={style.about}>
        
            <div>
                <h4>Institutional</h4>
                <p className={style.institutional}>
                    Nuestra plataforma de películas independientes ofrece una experiencia 
                    única, combinando lo mejor del cine con la última 
                    tecnología. Le brindamos una oportunidad de monetización a cineastas independientes de manera sencilla y especializada que no encuentran en otras plataformas.
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

            {developers.length > 0 &&        
            <section className={style.profiles}>
            {developers.map((dev,index)=>{
                return (
                    <article key={index} className={style.profile}>
                        <div className={style.image}>
                            <img src={dev.image} alt="" />
                        </div>
                        <div className={style.info}>
                            <h3>{dev.name}</h3>
                            <div className={style.description}>
                                {dev.description}
                            </div>
                        </div>
                        <div className={style.social}>
                            <Link href={dev.gitHub}target="_blank">
                                <Image src={gh} alt="github"/>   
                            </Link>
                            <Link href={dev.linkedIn}target="_blank">
                                <Image src={linkedIn} alt="linkedin"/>   
                            </Link>
                        </div>
                    </article>
                    )
                })
            }
                
            </section>
        }

        </div>
    )
}

export default About