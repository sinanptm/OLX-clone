import { useContext, createContext, useState } from "react";

const PostContext = createContext()

export const usePost = () => {
    return useContext(PostContext);
};

const Post = ({ children }) => {
    const [postDetals,setPostDetals] = useState();
    return <PostContext.Provider value={{postDetals,setPostDetals}}> {children}  </PostContext.Provider>
}

export default Post;