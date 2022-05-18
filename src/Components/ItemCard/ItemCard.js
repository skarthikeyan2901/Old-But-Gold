import React, { useEffect, useState } from "react";

function ItemCard({ item }) {

    // const [imageSrc, setImageSrc] = useState('');
    
    // function arrayBufferToBase64(buffer) {
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // };

    // useEffect(() => {
    //     let base64flag = "data:image/jpeg;base64";
    //     console.log(item.images.data.data);
    //     let imageStr = arrayBufferToBase64(item.images);
    //     setImageSrc(base64flag + imageStr);
    // }, [])


    const noImageSrc =
      "https://ik.imagekit.io/uu9zwft992t/OldButGold/no-image_52h6-Z8NY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652348788533";

    return (
      <div className="bg-gray-100 rounded-lg w-64 shadow-md">
        <img src={noImageSrc} alt="No image"></img>
        <div className="p-2">
          <div className="pb-2">
            <div className="text-xl">{item.name}</div>
            <div className="text-md">{item.itemType}</div>
          </div>
          <div className="pt-2 text-md">Days Used: {item.daysUsed}</div>
        </div>
        <button className="w-full py-2 bg-purple-300 rounded-lg hover:text-white hover:bg-purple-500">
          Obtain
        </button>
      </div>
    );
}

export default ItemCard;