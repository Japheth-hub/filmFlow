import React,{useState,useEffect} from 'react'
import style from './Multiselect.module.scss'
import Pill from '@/components/pill/Pill'

export default function Multiselect({items,initial,name,callback,type}) {
    const [selectedItems,setSelectedItems] = useState([]);
    const [selectValue,setSelectValue] = useState("");
    
    const toggleItem = (item) => {
        let totalItems = [];
        if (item.name) {
            if(selectedItems.includes(item.name)){
                totalItems = selectedItems.filter(selectedItem => selectedItem !== item.name);
                
            }else {
                totalItems = [...selectedItems, item.name]
            }
        }else{
            if(selectedItems.includes(item)){
                totalItems = selectedItems.filter(selectedItem => selectedItem !== item)
            }else {
                totalItems = [...selectedItems, item]
            }
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

const handleChange = (e)=>{
    toggleItem(e.target.value);
    setSelectValue(e.target.value);
}

useEffect(()=>{
},[selectedItems])

  return (
   
    <>
        
        {type !== 'select' && items.map(item => (
            <Pill key={item.id} selected={checkSelected(item)} label={item.label || item.name} emoji={item.emoji} callback={()=>{toggleItem(item)}} />
         ))}

        {type === 'select' &&
           <>   
           
               <select name="" id="" value={selectValue} onChange={handleChange}>
                    {items.map((item)=>{
                        return <option key={item.id} value={item.name}>{item.name}</option>
                    })}
                </select>
                <div className={style.list}>
                    {selectedItems.map((item,index)=>{
                            return <Pill key={index} selected={checkSelected(item)} label={item} callback={()=>{toggleItem(item)}} />
                    })}
                </div>

           </>
            
        }

    </>
    
  )
}
