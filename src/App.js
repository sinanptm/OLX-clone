import React from "react";
import { AuthProvider } from "./AuthContext";
import AppRouter from "./AppRouter";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
