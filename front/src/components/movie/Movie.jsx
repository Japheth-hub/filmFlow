import style from "./Movie.module.scss"
import Buy from '../btnBuy/buy'
import Link from "next/link";

const Movie = ({ elem, dim }) => {
    const title = (title)=>{
        if(title){
            return title.length >=15 ? title.slice(0,15)+"...":title;
        }
    }
    return(
        <div key={elem.id} className={style.card} >
         <Link href={`/`} key={elem.id}>
           <div>
            <Link href={`/detail/${elem.id}`}>
                <img 
                    src={elem.poster}
                    width={dim ? dim[0] : '200px'}
                    height={dim ? dim[1] : '300px'}
                />
            </Link> 
           </div>

            <div className={style.order}>{title(elem.name) }</div>
            </Link>
            <div><Buy movie = {elem}></Buy></div>

        </div>
    )
}

export default Movie;
