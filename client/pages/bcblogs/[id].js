import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useMoralis } from "react-moralis";
import Widgets from "../../components/Widgets";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { Star, Copy, MessageCircle } from "@web3uikit/icons";
import { BiTransfer } from "react-icons/bi";
import { useState } from "react";
import styles from "./id.module.css";
import Web3Modal from "web3modal";
import BlogX from "../../context/BlogXContract.json";
import { BlogXContractAddress } from "../../context/address.js";
import { ethers } from "ethers";

const style = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: "basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto px-4",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
  blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
  profile: `flex items-center flex-row p-2`,
  profilechars: `flex-1 text-md font-bold`,
  engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md`,
  blogText: `text-md text-black font-bold`,
};

const Details = () => {
  const [post, setPosts] = useState([]);
  const { asPath } = useRouter();
  const getUpdatedPosts = (allBlogs, address) => {
    let updatedPosts = [];
    for (let i = 0; i < allBlogs.length; i++) {
      if (allBlogs[i].username.toLowerCase() === address.toLowerCase()) {
        let blog = {
          id: allBlogs[i].id,
          blogText: allBlogs[i].blogText,
          username: allBlogs[i].username,
          isDeleted: allBlogs[i].isDeleted,
          personal: true,
        };

        updatedPosts.push(blog);
      } else {
        let blog = {
          id: allBlogs[i].id,
          blogText: allBlogs[i].blogText,
          username: allBlogs[i].username,
          isDeleted: allBlogs[i].isDeleted,
          personal: false,
        };

        updatedPosts.push(blog);
      }
    }

    return updatedPosts;
  };

  const getAllBlogs = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const blogXContract = new ethers.Contract(
        BlogXContractAddress,
        BlogX.abi,
        signer
      );

      let allBlogs = await blogXContract.getAllBlogs();
      setPosts(getUpdatedPosts(allBlogs, ethereum.selectedAddress));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style.wrapper}>
        <div className={style.columns}>
          <div className={style.sides}>
            <Sidebar />
          </div>
          <div className={style.side2}>
            <div className={style.feed}>
              <br />
              <div className={style.blogs}>
                <div>
                  <div className={style.profile}>
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-full"
                        src={"/pfp1.png"}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className={style.profilechars}>
                      <p className="font-bold">
                        {post[asPath.split("/")[2]] &&
                          post[asPath.split("/")[2]].username.slice(0, 6) +
                            "..." +
                            post[asPath.split("/")[2]].username.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className={style.blogText}>
                    <div className={styles.blog_text}>
                      {" " +
                        (post[asPath.split("/")[2]] &&
                          post[asPath.split("/")[2]].blogText) +
                        " "}
                    </div>
                  </div>
                  <div className={style.engage}>
                    <div className="flex flex-row gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex items-center gap-1">
                        <BiTransfer className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Copy />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.widgets}>
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
