import React,{useState,useEffect} from 'react'
import style from './Multiselect.module.scss'
import Pill from '@/components/pill/Pill'

export default function Multiselect({items,initial,name,callback}) {
    const [selectedItems,setSelectedItems] = useState([]);
    
    const toggleItem = (item) => {
        if (selectedItems.includes(item.name)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item.name));
        } else {
            setSelectedItems([...selectedItems, item.name]);
        }
    }; 
    const checkSelected = (item)=>{
        if(selectedItems.includes(item.name)) return true
        return false
    }
    
useEffect(() => {
    let cleanedSelected = selectedItems;
    if(selectedItems.length > 0){
        cleanedSelected = selectedItems.join(",")
        callback({target:{name,value:cleanedSelected}});
    }
    
}, [selectedItems])

useEffect(() => {
    console.log(initial);
    console.log(typeof initial);
    if(initial && !Array.isArray(initial)){
        initial = initial.split(',');
        if(initial.length > 0) setSelectedItems(initial);
    }else if(Array.isArray(initial) && initial.length > 0){
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
