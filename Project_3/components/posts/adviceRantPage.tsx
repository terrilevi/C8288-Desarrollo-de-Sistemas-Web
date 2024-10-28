import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../features/posts';
import { RootState } from "../../index"; 



const AdviceRantPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [postContent, setPostContent] = useState("");

    const handleAddPost = (postType: string) => {
        dispatch(addPost({
            postType,
            name: user.value.name,
            age: user.value.age,
            content: postContent
        }));

    };

    return (
        <div>
            <h1>Express Yourself</h1>
            <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <button onClick={() => handleAddPost("Ask for Advice")}>Ask for Advice</button>
            <button onClick={() => handleAddPost("Rant")}>Rant</button>
        </div>
    );
};

export default AdviceRantPage;