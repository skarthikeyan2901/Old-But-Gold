import React from 'react'
import JsonData from '../../MockData/MOCK_DATA (1).json'
import {useState} from 'react'
function SearchBar() {
    const [searchTerm,setSearchTerm] = useState('');

  return (
    <div>
        <div className="mb-3 pt-0">
            <input type="text" placeholder="Search..." 
            className="px-3 py-3 placeholder-slate-300 text-slate-600 
            relative bg-white bg-white rounded text-bg border-1 shadow 
            outline-none focus:outline-none focus:ring w-full"
            onChange={event=>{setSearchTerm(event.target.value)}}
            />
            {JsonData.filter((val)=>{
                if(searchTerm===""){
                    return val
                }else if(val.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }

            }).map((val,key)=>{
                return(
                    <div>
                        <p>{val.first_name}</p>
                    </div>

                )
            })}
        </div>
    </div>
  )
}

export default SearchBar
