// import { Chat } from "@pushprotocol/uiweb";

// import React from 'react'

// function ChatNew() {
//     return (
//         <div>
//             <Chat
//             account="0x9dAdFaDcaBd4D10B664035778c215183ab1726e9"
//             supportAddress="0x0d75194C804C26912F233A0072A4816DDdcf3173"
//             apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
//             env="staging" />
//         </div>
//     )
// }

// export default ChatNew

import React, { useContext, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Chat } from "@pushprotocol/uiweb";

const ChatNew = () => {
    return (

        <Chat
            account="0x01c94515D28249602548bE29161CE962616B5f66" //user address
            supportAddress="0x9dAdFaDcaBd4D10B664035778c215183ab1726e9" //support address
            apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
            env="staging"
        />
    );
};

export default ChatNew;