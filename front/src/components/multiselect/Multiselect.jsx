import React,{useState,useEffect} from 'react'
import style from './Multiselect.module.scss'
import Pill from '@/components/pill/Pill'

export default function Multiselect({items,initial,name,callback}) {
    const [selectedItems,setSelectedItems] = useState([]);
    const toggleItem = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        console.log(selectedItems.join(","));
        
    }; 
    
useEffect(() => {
    if(selectedItems.length > 0){
        callback({target:{name,value:selectedItems.join(",")}})
    }
}, [selectedItems])

useEffect(() => {
    console.log(initial);
    if(!Array.isArray(initial)){
        initial = initial.split(',');
        setSelectedItems(initial);
    }
}, [initial])


  return (
   
    <>
        <select
            name={name}
            value={selectedItems}
            onChange={(e) => toggleItem(e.target.value)}
            className={style["form-input"]}
        >
            <option value="">Selecciona...</option>
            {items.map(item => (
            <option key={item.id} value={item.name}>{item.name.replace(/\b\w/g, c => c.toUpperCase())}</option>
            ))}
        </select>
        <ul className={style.list}>
        {selectedItems && selectedItems.map((item, index) => (
            <Pill key={index} label={item} callback={() => toggleItem(item)} />
        ))}
        </ul>
    </>
    
  )
}
