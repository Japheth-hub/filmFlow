import React,{useState,useEffect} from 'react'
import style from './Multiselect.module.scss'
import Pill from '@/components/pill/Pill'

export default function Multiselect({items,initial,name,callback}) {
    const [selectedItems,setSelectedItems] = useState([]);
    
    const toggleItem = (item) => {
        let totalItems = [];
        if (selectedItems.includes(item.name)) {
            totalItems = selectedItems.filter(selectedItem => selectedItem !== item.name)
        
        } else {
            totalItems = [...selectedItems, item.name]
            setSelectedItems([...selectedItems, item.name]);
        }

        const cleanedSelected = totalItems.join(",")
        callback({target:{name,value:cleanedSelected}});
        setSelectedItems(totalItems);
    }; 
    const checkSelected = (item)=>{
        if(selectedItems.includes(item.name)) return true
        return false
    }
    

useEffect(() => {

    if(initial && !Array.isArray(initial)){
        initial = initial.split(',');
        setSelectedItems(initial);
    }else if(Array.isArray(initial)){
        setSelectedItems(initial);
    }else{
        setSelectedItems([]);
    }

}, [initial])


  return (
   
    <>
        
        {items.map(item => (
            <Pill key={item.id} selected={checkSelected(item)} label={item.label} emoji={item.emoji} callback={()=>{toggleItem(item)}} />
         ))}
    </>
    
  )
}
