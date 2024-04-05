'use client'
import { useState } from 'react'
import coupon from 'coupon-code'

const Promos = () =>{

    const [code,setCode] = useState('')
    const [generatedCodes, setGeneratedCodes] = useState({});

    const generateCode = () => {
        let genCode;

        do {
          genCode = coupon.generate(); 
        } while (generatedCodes.hasOwnProperty(genCode)); 

        const discount = 0.15 //15%- hacer variable? 

        console.log("code:", genCode);

        setCode(genCode); 
        setGeneratedCodes(prevCodes => ({ ...prevCodes, [genCode]: discount })); 
    };
    
    const removeCode = (codeToRemove) => {
        const updatedCodes = { ...generatedCodes };
        delete updatedCodes[codeToRemove];
        setGeneratedCodes(updatedCodes);
    };

    return(
        //navbar
        <div>
            <p>Generate a code {"-->"}</p>
            <button onClick={generateCode}>click me!</button>
            <p>Generated codes:</p>
            <ul>
                {Object.entries(generatedCodes).map(([code, discount], index) => (
                <li key={index}>
                    {code} (Discount: {discount * 100}%) <button onClick={() => removeCode(code)}>Use Code</button>
                </li>
                ))}
            </ul>

            
        </div>
        //footer
    )
}

export default Promos;