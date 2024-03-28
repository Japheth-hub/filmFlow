import style from "./Movie.module.scss"
import Link from "next/link";

const Movie = ({ elem, dim }) => {
    const title = (title)=>{
        if(title){
            return title.length >=15 ? title.slice(0,15)+"...":title;
        }
    }
    return(
        <div key={elem.id} className={style.card} >
            <Link href={`/detail/${elem.id}`} key={elem.id}>
                <div className={style.image}>
                    <img 
                        src={elem.poster}
                        width={dim ? dim[0] : '200px'}
                        height={dim ? dim[1] : '300px'}
                    />
                    <div className={style.info}>
                        <div>{title(elem.name)}</div>
                    </div>
                </div>

            </Link>
        </div>
    )
}

export default Movie;
