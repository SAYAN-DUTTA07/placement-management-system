import { useEffect, useState } from "react";
import API from "../services/api";

function NotificationBell() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        fetchCount();

    }, []);

    const fetchCount = async () => {

        try {

            const response = await API.get(
                "/notification/count"
            );

            setCount(response.data.count);

        }
        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="text-xl">

            🔔 {count}

        </div>

    );

}

export default NotificationBell;