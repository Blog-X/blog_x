import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

const MyApp = ({ Component, pageProps }) => (
  <MoralisProvider
    appId={process.env.NEXT_PUBLIC_APP_ID}
    serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    masterKey={process.env.NEXT_PUBLIC_MASTER_KEY}
  >
    <NotificationProvider>
      <div className="layout bg-[#0e121e] overflow-x-hidden h-screen">
        <div className="">
          <Component {...pageProps} />
        </div>
      </div>
    </NotificationProvider>
  </MoralisProvider>
);

export default MyApp;
