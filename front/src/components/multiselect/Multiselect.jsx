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
    }; 
    
useEffect(() => {
    let cleanedSelected = selectedItems;
    if(selectedItems.length > 0){
        cleanedSelected = selectedItems.join(",")
    }
    
    callback({target:{name,value:cleanedSelected}});
}, [selectedItems])

useEffect(() => {
    if(initial && !Array.isArray(initial)){
        initial = initial.split(',');
        if(initial.length > 0) setSelectedItems(initial);
    }
}, [initial])


  return (
   
    <>
        <select
            name={name}
            value={selectedItems.join(',')}
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
            item && <Pill key={index} label={item} callback={() => toggleItem(item)} />
        ))}
        </ul>
    </>
    
  )
}
