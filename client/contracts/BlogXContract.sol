// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract BlogXContract {

    event AddBlog(address recipient, uint blogId);
    event DeleteBlog(uint blogId, bool isDeleted);

    struct Blog {
        uint id;
        address username;
        string blogText;
        bool isDeleted;
    }

    Blog[] private blogs;

    // Mapping  Blog id to the wallet address of the user
    mapping(uint256 => address) blogToOwner;

    // Method called by our frontend when trying to add a new Blog
    function addBlog(string memory blogText, bool isDeleted) external {
        uint blogId = blogs.length;
        blogs.push(Blog(blogId, msg.sender, blogText, isDeleted));
        blogToOwner[blogId] = msg.sender;
        emit AddBlog(msg.sender, blogId);
    }

    // Method to get all the Blogs
    function getAllBlogs() external view returns (Blog[] memory) {
        Blog[] memory temporary = new Blog[](blogs.length);
        uint counter = 0;
        for(uint i=0; i<blogs.length; i++) {
            if(blogs[i].isDeleted == false) {
                temporary[counter] = blogs[i];
                counter++;
            }
        }

        Blog[] memory result = new Blog[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to get current user's Blogs
    function getMyBlogs() external view returns (Blog[] memory) {
        Blog[] memory temporary = new Blog[](blogs.length);
        uint counter = 0;
        for(uint i=0; i<blogs.length; i++) {
            if(blogToOwner[i] == msg.sender && blogs[i].isDeleted == false) {
                temporary[counter] = blogs[i];
                counter++;
            }
        }

        Blog[] memory result = new Blog[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to Delete a Blog
    function deleteBlog(uint blogId, bool isDeleted) external {
        if(blogToOwner[blogId] == msg.sender) {
            blogs[blogId].isDeleted = isDeleted;
            emit DeleteBlog(blogId, isDeleted);
        }
    }

}