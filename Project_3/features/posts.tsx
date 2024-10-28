import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Post } from '../types/posts';

interface PostsState {
    posts: Post[];
}

const initialState: PostsState = {
    posts: []
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        } //
    }
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
