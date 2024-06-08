import React from "react";
import { AuthProvider } from "./Store/AuthContext";
import PostProvider from "./Store/PostContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <AppRouter />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
