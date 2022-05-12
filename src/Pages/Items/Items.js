import React from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import NavBar from "../../Components/NavBar/NavBar";

function Items() {
    return (
    <div>
        <NavBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 p-5">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            </div>
        </div>
    </div>
    );
}

export default Items;