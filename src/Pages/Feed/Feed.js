import React from "react";
import ItemCard from "../../Components/ItemCard/ItemCard";
import NavBar from "../../Components/NavBar/NavBar";
import SearchBar from "../../Components/SearchBar/SearchBar";

function Feed() {
    return (
    <div>
        <NavBar />
        <div className="flex justify-center pt-6">
            <SearchBar />
        </div>
        <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 p-6">
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

export default Feed;