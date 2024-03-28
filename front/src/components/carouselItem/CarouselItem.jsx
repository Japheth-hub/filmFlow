import style from "./CarouselItem.module.scss"

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
            </div>
           
        </div>
    )
}

export default CarouselItem;