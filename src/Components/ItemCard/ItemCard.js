import React from "react";

function ItemCard() {
    return (
      <div className="bg-gray-100 rounded-lg w-64 shadow-md">
        <img src="https://ik.imagekit.io/uu9zwft992t/OldButGold/no-image_52h6-Z8NY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652348788533"></img>
        <div className="p-2">
            <div className="pb-2">
                <div className="text-xl">
                    Item Name
                </div>
                <div className="text-md">
                    Owner Name
                </div>
            </div>
            <div className="pt-2 text-md">
                Days Used
            </div>
        </div>
        <button className="w-full py-2 bg-purple-300 rounded-lg hover:text-white hover:bg-purple-500">Obtain</button>
      </div>
    );
}

export default ItemCard;