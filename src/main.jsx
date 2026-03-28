import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

try {
  import("./App.jsx")
    .then((module) => {
      const AppComponent = module.default;
      createRoot(document.getElementById("root")).render(
        <StrictMode>
          <AppComponent />
        </StrictMode>
      );
    })
    .catch((e) => {
      document.body.innerHTML = `<pre style="color:red;padding:20px">${e.message}\n${e.stack}</pre>`;
    });
} catch (e) {
  document.body.innerHTML = `<pre style="color:red;padding:20px">${e.message}\n${e.stack}</pre>`;
}
