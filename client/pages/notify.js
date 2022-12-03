import * as PushAPI from "@pushprotocol/restapi";

import React, { useEffect, useState } from 'react'

const Notify = () => {

    const [getNotif, setGetNoti] = useState([]);
    useEffect(() => {
        const getNoti = async () => {
            const notifications = await PushAPI.user.getFeeds({
                user: 'eip155:42:0x0d75194C804C26912F233A0072A4816DDdcf3173', // user address in CAIP
                env: 'staging'
            });
            setGetNoti(notifications);
            console.log(notifications)

        }
        getNoti();
    }, [])

    return (
        <div></div>
    )
}

export default Notify
