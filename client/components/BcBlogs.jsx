import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Copy, Matic, MessageCircle } from "@web3uikit/icons";
import { BsStars } from "react-icons/bs";
import { ethers } from "ethers";
import { BlogXContractAddress } from "../context/address.js";
import FlipMove from "react-flip-move";
import axios from "axios";
import BlogX from "../context/BlogXContract.json";
import Post from "./Post";
import Web3Modal from "web3modal";
import { useMoralis } from "react-moralis";

const style = {
  blogs: `bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
  profile: `flex items-center flex-row p-2`,
  profilechars: `flex-1 text-md font-bold`,
  engage: `flex flex-row justify-between items-center pt-4 pb-1 hower:shadow-md bg-[#fff] text-[#15202b] p-4 rounded-lg shadow-md text-left mt-4 flex flex-col`,
  blogText: `text-md font-bold`,
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center rounded-b-lg p-4`,
  headerTitle: `text-xl font-bold items-center`,
};

const BcBlogs = () => {
  const [post, setPosts] = useState([]);
  const {user, isAuthenticated, web3, Moralis} = useMoralis();
  const currUser = Moralis.User.current()
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

  const deletePost = (key) => async () => {
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

      let deleteBlogTX = await blogXContract.deleteBlog(key, true);
      let allBlogs = await blogXContract.getAllBlogs();
      setPosts(getUpdatedPosts(allBlogs, ethereum.selectedAddress));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-800 pb-4">
      <div className={style.wrapper}>
        <div>
          {console.log(post)}
          
          {post.map((post, i, j) => (
            <div key={i}>
              <Post
                postkey={i}
                displayName={post.username}
                text={post.blogText}
                personal={post.personal}
                onClick={deletePost(post.id)}
                key={i}
              />
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  );
};

export default BcBlogs;
