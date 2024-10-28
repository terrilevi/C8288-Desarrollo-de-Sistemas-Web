import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../index"; 
import Post from './Post'; 

const PostList = () => {
    const posts = useSelector((state: RootState) => state.posts.posts);

    return (
        <div>
            {posts.map((post, index) => (
                <Post
                    key={index}
                    postType={post.postType}
                    name={post.name}
                    age={post.age}
                    content={post.content}
                />
            ))}
        </div>
    );
};

export default PostList;
