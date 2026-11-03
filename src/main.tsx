import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Restore deep-link after GitHub Pages 404.html bounce
const redirect = sessionStorage.getItem("cam-spa-redirect");
if (redirect) {
  sessionStorage.removeItem("cam-spa-redirect");
  const base = "/cam-website";
  if (redirect.startsWith(base)) {
    history.replaceState(null, "", redirect);
  }
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/cam-website">
    <App />
  </BrowserRouter>
);
