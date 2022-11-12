import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
// import { TweetProvider } from "../context/tweetApp";

const MyApp = ({ Component, pageProps }) => (
  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    masterKey={process.env.NEXT_PUBLIC_MASTER_KEY}
  >
    {/* <TweetProvider> */}
    <NotificationProvider>
      <div className="layout overflow-x-hidden pt-4 bg-[#0e121e] overflow-x-hidden h-screen">
        <div className="">
          <Component {...pageProps} />
        </div>
      </div>
    </NotificationProvider>
    {/* </TweetProvider> */}
  </MoralisProvider>
);

export default MyApp;
