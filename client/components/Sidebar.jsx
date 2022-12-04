import React from "react";

import { List, Home, User, Phone } from "@web3uikit/icons";
import SidebarOptions from "./SidebarOptions";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Widgets from "./Widgets";
import { Chat } from "@pushprotocol/uiweb";
import ChatNew from "../components/ChatNew";

import {useState, useContext} from "react";

const styles = {
  container: "py-4 px-10 bg-gray-50 rounded-2xl h-full w-3/4 m-auto mt-4",
  title:
    "text-4xl font-bold py-4 hover:underline cursor-pointer font-normal hover:font-bold",
  option:
    "flex flex-col justify-center items-center py-2 hover:bg-slate-700 cursor-pointer mx-12 rounded-2xl",
  publish:
    "text-2xl font-bold py-4 hover: cursor-pointer font-normal hover:font-bold text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-2xl w-1/2 m-auto mt-8",
  largerscreens: "sticly top-5",
  logout:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-2xl w-1/2 m-auto mt-10",
};

const Sidebar = () => {
  const [selected, setSelected] = useState();
  const { Moralis } = useMoralis();
  const router = useRouter();
  return (
    <div className={styles.largerscreens}>
      <div className={styles.container} style={{ backgroundColor: "#192734" }}>
        <hr />

        <SidebarOptions
          option="Home"
          Icon={Home}
          isActive={Boolean(selected === "Home")}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOptions
          option="Blockchain Feed"
          Icon={List}
          isActive={Boolean(selected === "Blockchain Blogs")}
          setSelected={setSelected}
          redirect="/bcblogspage"
        />
        <SidebarOptions
          option="Profile"
          Icon={User}
          isActive={Boolean(selected === "Profile")}
          setSelected={setSelected}
          redirect="/profile"
        />
        <SidebarOptions
          option="Contact Us"
          Icon={Phone}
          isActive={Boolean(selected === "Contact Us")}
          setSelected={setSelected}
          redirect="/"
        />
        <SidebarOptions
          option="Contact Us"
          Icon={Phone}
          isActive={Boolean(selected === "Contact Us")}
          setSelected={setSelected}
          redirect="/"
        />
        <ChatNew/>
        <hr />
      </div>
      <div className="hidden md:inline lg:hidden">
        <Widgets />
      </div>
      <div
        className="logout"
        onClick={() => {
          router.push("/");
          Moralis.User.logOut().then(() => {
            window.location.reload();
          });
        }}
      >
        <div className={styles.logout}>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
