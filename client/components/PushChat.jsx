import React, { useContext, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Chat } from "@pushprotocol/uiweb";

const PushChat = (props) => {
    return (
      // console.log("recieverId", props.recieverId + typeof(props.recieverId)),
      <>
        {/* <div>
            <div className="h-10">
              <input
                type="text"
                className="bg-white rounded-md text-sm w-5/6 py-2 px-4 text-black font-bold"
                value={props.recieverId}
                onChange={(e) => {
                  setRecieverId(e.target.value);
                }}
                placeholder="Enter reciever address"
              />
            </div>
        </div> */}
        
        <Chat
            account="0xb17bc8c23e53f463F0332008D518121B74b260d2" //user address
            supportAddress={props.recieverId} //support address
            apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
            env="staging"
        />
      </>
    );
};

export default PushChat;