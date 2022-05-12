import React from "react";
import NavBar from "../../Components/NavBar/NavBar";

function ListItem() {
    return (
      <div>
        <NavBar />
        <div className="text-5xl flex justify-center py-5 ">List an Item</div>
        <div className="flex justify-center">
          <form>
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter name of item"
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter type of item"
            />
            <input
              type="text"
              className="formElement mt-4"
              placeholder="Enter days used"
            />
            <input type="file" className="mt-4" />
            <div className="mt-4 flex justify-center">
              <button className="w-72 h-12 text-blue-700 outline outline-1 hover:outline-2 outline-blue-500 text-lg hover:bg-blue-500 hover:text-white rounded-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default ListItem;