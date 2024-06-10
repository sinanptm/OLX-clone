import React from "react";
import { AuthProvider } from "./Provider/AuthContext";
import PostProvider from "./Provider/PostContext";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <AppRouter />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
