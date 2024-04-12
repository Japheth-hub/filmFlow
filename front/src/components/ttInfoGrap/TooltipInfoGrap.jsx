import Image from 'next/image'
import info from '@/img/tooltip-info.svg'
import style from './TooltipInfoGrap.module.scss'

const TooltipInfoGrap = ({content}) => {
    return(
        <div className={style.tooltip}>
                <span className={style.tooltiptext}>{content}</span>
            <Image
                className={style.img}
                src={info}
                width={25}
                height={25}
                alt="info"/>
            </div>
    )
}

export default TooltipInfoGrap;