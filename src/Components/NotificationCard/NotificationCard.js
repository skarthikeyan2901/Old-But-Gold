import React from "react"

function NotificationCard({notif}) {

  let datePosted = notif.notificationDate
  datePosted = datePosted.slice(0, 10);
  let tempDate = datePosted.split("-");
  tempDate.reverse();
  datePosted = tempDate.join("/");

    return (
      <div className="flex justify-around py-8">
        <div className="w-1/6 flex justify-center items-center text-lg text-purple-600">{datePosted}</div>
        <div className="w-5/6">
          {notif.message}
        </div>
      </div>
    );
}

export default NotificationCard;