import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./context/usercontext.jsx";
import { CandidatesProvider } from "./context/condidatesContext.jsx";
import { LeavesProvider } from "./context/LeaveContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CandidatesProvider>
        <LeavesProvider>
          <React.Suspense fallback={<div>Loading...</div>}>
            <App />
          </React.Suspense>
        </LeavesProvider>
      </CandidatesProvider>
    </AuthProvider>
  </BrowserRouter>
);
