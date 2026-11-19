import { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            const response = await API.get("/notification");
            setNotifications(response.data);

        }
        catch (err) {

            console.log(err);

        }

    };

    const markAsRead = async (id) => {

        try {

            await API.put(`/notification/${id}`);
            fetchNotifications();

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Notifications
                </h1>

                {

                    notifications.map((notification) => (

                        <div
                            key={notification._id}
                            className={`p-6 rounded-xl shadow mb-4 text-black dark:text-white ${notification.isRead
                                    ? "bg-gray-100 dark:bg-gray-700"
                                    : "bg-white dark:bg-gray-800"
                                }`}
                        >

                            <p>
                                {notification.message}
                            </p>

                            {

                                !notification.isRead &&

                                <button

                                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"

                                    onClick={() =>
                                        markAsRead(
                                            notification._id
                                        )
                                    }

                                >

                                    Mark as Read

                                </button>

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Notifications;