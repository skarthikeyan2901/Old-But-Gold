import React from 'react'
import ItemCard from "../../Components/ItemCard/ItemCard";
import {useState} from 'react'
function SearchBar({ items, reload, setReload, user }) {
    const [searchTerm,setSearchTerm] = useState('');

  return (
    <div>
      <div className="mb-3 pt-0">
        <div className='flex justify-center'>
          <input
            type="text"
            placeholder="Search..."
            className="p-3 w-80 placeholder-gray-700 text-slate-600 bg-slate-50 rounded text-bg shadow-md outline-none focus:outline-none focus:ring border-2"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>

        <div className="flex justify-center container mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-24 pt-6">
            {items
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().startsWith(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item, key) => {
                return (
                  <ItemCard
                    item={item}
                    user={user}
                    reload={reload}
                    setReload={setReload}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar
