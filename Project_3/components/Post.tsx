// src/components/Post.tsx
import React from "react";

interface PostProps {
    postType: string;
    name: string;
    age: number;
    content: string;
}

const Post = ({ postType, name, age, content }: PostProps) => {
    return (
        <div className="post">
            <h3>{postType}</h3>
            <p>{name} / {age} says...</p>
            <p>{content}</p>
        </div>
    );
};

export default Post;
