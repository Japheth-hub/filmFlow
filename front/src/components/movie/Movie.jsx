import style from "./Movie.module.scss"
import Buy from '../btnBuy/buy'

const Movie = ({ elem, dim }) => {
    const title = (title)=>{
        if(title){
            return title.length >=15 ? title.slice(0,15)+"...":title;
        }
    }
    return(
        <div key={elem.id} className={style.card} >
           <div>
                <img 
                    src={elem.poster}
                    width={dim ? dim[0] : '200px'}
                    height={dim ? dim[1] : '300px'}
                />
           </div>

            <div className={style.order}>{title(elem.name) }</div>
            <div><Buy movie = {elem}></Buy></div>

        </div>
    )
}

export default Movie;