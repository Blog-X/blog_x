
import { useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import HomeComp from "./HomeComp";

const WorldIDWidget =
    dynamic(() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false, });

const Userverification = (props) => {
    //const ctx = useContext(AppContext);
    const router = useRouter();
    return (
        <div>
            {" "}
            <WorldIDWidget
                actionId="wid_staging_f88db2e1c34a9e9cd1604669027af4b5" // obtain this from developer.worldcoin.org
                signal="Verification"
                enableTelemetry
                onSuccess={async (proof) => {
                    const formdata = {
                        ...proof,
                        signal: "Verification",
                        action_id: "wid_staging_f88db2e1c34a9e9cd1604669027af4b5",
                    };
                    const res = await fetch(
                        "https://developer.worldcoin.org/api/v1/verify",
                        {
                            method: "POST",
                            body: JSON.stringify(formdata),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    const data = await res.json();
                    console.log("data", data);
                    // props.setAuth2(true);
                    router.push('/')
                }}
                onError={(error) => console.error(error)}
                debug={true} // to aid with debugging, remove in production
            />
        </div>
    );
};

export default Userverification;
