import React from 'react'
import { useRouter } from 'next/router';
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MessageCircle } from "@web3uikit/icons";
import { BiTransfer } from "react-icons/bi";


const DynamicWidgets = () => {

    const { Moralis, isInitialized } = useMoralis();
    const [widget, setWidget] = useState();
    const router = useRouter();

    useEffect(() => {
        const getFeed = async () => {
            const Blogs = Moralis.Object.extend("Blogs");
            const query = new Moralis.Query(Blogs);
            const feed = await query.find();
            setWidget(feed);
        }
        getFeed();
    }, []);

    useEffect(() => {
        if (!isInitialized) {
            router.push("/");
        }
    }, []);

    const getTopWidgets = () => widget && (widget.sort((a, b) => b.attributes.Likes - a.attributes.Likes));

    const getRandomNumber = (a, b) => {
        return Math.floor(Math.random() * (b - a) + a);
    }

    const getRandomWidgets = () => {
        const randomWidgets = [];
        getTopWidgets();
        let selectedIndex = [];
        for (let i = 0; i < 4; i++) {
            const index = getRandomNumber(0, 10 < widget.length ? 10 : widget.length);
            if (index in selectedIndex) {
                i--;
                continue;
            }
            randomWidgets.push(widget[index]);
            selectedIndex.push(index);
        }
        return randomWidgets;
    }

    {
        if (widget) {
            return (
                <>
                    <div>
                        {
                            getRandomWidgets().map((blog) => (
                                blog &&
                                <div key={widget._id} className="p-4">
                                        <div className="flex-shrink-0 text-left bg-[#1e1e1e] rounded-md p-4 px-2">
                                        <a>
                                            <h2>{blog.attributes.Title}</h2>
                                        </a>
                                        <Link href={"/profile/" + blog.attributes.UserAccount} key={blog.UserAccount}> <div className='font-bold'>
                                            <p>{blog.attributes.UserName}</p>
                                        </div></Link>
                                        <div className=''>
                                            <p>{blog.attributes.blogTxt && blog.attributes.blogTxt.slice(0, 40) + (blog.attributes.blogTxt.length > 40 ? " ..." : " ")}</p>
                                            <div>
                                                <Link href={`/blog/${blog.id}`}><p className="text-blue-500 text-xs text-right">Read More</p></Link>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-5 h-5 text-yellow-400" />
                                                    <p>{blog.attributes.Likes}</p>
                                                    <p>{blog.attributes.objectId}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle className="w-5 h-5 text-blue-500" />
                                                    <p>
                                                        {blog.attributes.BlogCommentsList
                                                            ? blog.attributes.BlogCommentsList.length
                                                            : 0}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BiTransfer
                                                        className="w-5 h-5 text-green-400"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                asPath + "blog/" + blog.id
                                                            );
                                                            alert(
                                                                "Copied to clipboard - " +
                                                                asPath +
                                                                "blog/" +
                                                                blog.id
                                                            );
                                                        }}
                                                    />
                                                    <p>{blog.attributes.Shares}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            )
        }
    }

}

export default DynamicWidgets
