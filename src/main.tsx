import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <main className="flex flex-1 flex-col w-full p-1 my-0 mx-auto max-w-2xl">
      <App />
    </main>
  </React.StrictMode>
);
