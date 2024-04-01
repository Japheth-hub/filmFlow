import style from "./CarouselItem.module.scss"
import Button  from '@/components/button/Button';
import Link from 'next/link'


const CarouselItem = ({ elem }) => {
    return(
        <div key={elem.id} className={style.card} >
            <div className={style.image}>
                <img 
                    src={elem.poster}
                />
            </div>
            <div className={style.info}>
                <h3>{elem.name}</h3>
                <p>{elem.description}</p>
                <Link href={`/detail/${elem.id}`}>
                    <Button emoji="👀" label="Ver más" />
                </Link>
            </div>
           
        </div>
    )
}

export default CarouselItem;