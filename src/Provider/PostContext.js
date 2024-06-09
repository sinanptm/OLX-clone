import { useContext, createContext, useState } from "react";

const PostContext = createContext()

export const usePost = () => {
    return useContext(PostContext);
};

const Post = ({ children }) => {
    const [postDetails,setPostDetails] = useState();
    return <PostContext.Provider value={{postDetails,setPostDetails}}> {children}  </PostContext.Provider>
}

export default Post;