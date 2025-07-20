import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";

const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:8081/realms/workshop",
  client_id: "frontend",
  redirect_uri: "localhost:3000/secured",
};

function removeUrlParams() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig} onSigninCallback={removeUrlParams}>
      <App />
    </AuthProvider>
  </StrictMode>,
);
