import React, { useEffect, useState } from "react"
import NavBar from "../../Components/NavBar/NavBar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import NotificationCard from "../../Components/NotificationCard/NotificationCard";

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
        const user = jwt_decode(token);
        setUser(user);
        console.log(user);
        if (!user) {
          localStorage.removeItem("token");
        }
      }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        let tempUser = jwt_decode(token);
      axios
        .get("http://localhost:8080/notification/getNotifications", {
          params: {
              user: tempUser.email,
          }
        })
        .then((res) => {
          console.log(res)
          setNotifications(res.data.notif);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <div>
                {notifications.map((notif, key) => {
                    return <NotificationCard notif={notif} key={key} />
                })}
            </div>
        </div>
    )
}

export default Notifications;