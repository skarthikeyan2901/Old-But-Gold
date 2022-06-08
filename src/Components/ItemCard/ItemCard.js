import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ItemCard({ item, user, reload, setReload }) {

  const [modal, setModal] = useState(false);
  // console.log(item)

    const noImageSrc =
      "https://ik.imagekit.io/uu9zwft992t/OldButGold/no-image_52h6-Z8NY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652348788533";
    let imageSrc = item.images;
    let datePosted = item.datePosted;

    if(!item.images) {
      imageSrc = noImageSrc
    }

    datePosted = datePosted.slice(0, 10)
    let tempDate = datePosted.split("-");
    tempDate.reverse();
    datePosted = tempDate.join("/");

    const obtainItem = () => {
      axios
        .post("http://localhost:8080/item/issueItem", {
          itemId: item._id,
          user: user.email,
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === "SUCCESS") {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          setModal(false);
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <div
        className="rounded-lg w-80 shadow-md"
        style={{
          background:
            "linear-gradient(to bottom right, #ffffff 0%, #cc66ff 501%)",
        }}
      >
        <ToastContainer />
        <div className="p-2">
          <img
            src={imageSrc}
            alt="No image"
            className="w-80 h-56 object-contain"
          ></img>
        </div>
        <div className="py-2 px-4">
          <div className="pb-2">
            <div className="flex justify-between">
              <div className="text-xl pt-1">{item.name}</div>
              <div className="text-md bg-purple-400 rounded-xl p-1">
                {datePosted}
              </div>
            </div>
            <div className="text-md pt-1 text-slate-600">{item.itemType}</div>
          </div>
          <div className="pt-1 text-md">Days Used: {item.daysUsed}</div>
        </div>
        <div className="flex justify-center pt-4 pb-3">
          {!item.issued ? (
            <button
              className="w-4/5 py-2 bg-purple-300 text-purple-900 rounded-lg hover:text-white hover:bg-purple-500"
              onClick={() => {
                setModal(true);
              }}
              data-modal-toggle="popup-modal"
            >
              Obtain
            </button>
          ) : (
            <button
              disabled
              className="w-4/5 py-2 disabled:bg-purple-200 rounded-lg disabled:text-purple-900"
            >
              Obtained
            </button>
          )}
        </div>

        {/* Modal */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className={`${modal ? "block" : "hidden"} overflow-y-auto overflow-x-hidden fixed flex justify-center items-center backdrop-brightness-50 z-50 md:inset-0 h-modal md:h-full`}
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => {setModal(false)}}
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div class="p-6 text-center">
                <svg
                  class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to request this item?
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  onClick={obtainItem}
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {setModal(false)}}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ItemCard;