import { BrowserRouter, Route, Routes } from "react-router";
import { PublicApp } from "./PublicApp.tsx";
import { SecuredApp } from "./SecuredApp.tsx";
import { AppLayout } from "./AppLayout.tsx";
import { hasAuthParams, useAuth } from "react-oidc-context";
import { type ReactNode, useCallback, useEffect } from "react";

function App() {
  // TODO: 302 - Implement log out
  const handleLogout = useCallback(() => {}, []);

  // TODO: 403 - Set these to the actual values
  const isAuthenticated = true;
  const username = "Max Mustermann";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              onLogout={handleLogout}
              isAuthenticated={isAuthenticated}
              username={username}
            />
          }
        >
          <Route path="/" element={<PublicApp />} />
          <Route
            path="/secured"
            element={
              <AuthWrapper>
                <SecuredApp token={token} />
              </AuthWrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AuthWrapper({ children }: { children: ReactNode }) {
  const auth = useAuth();

  useEffect(() => {
    const signinRedirect = auth.signinRedirect;

    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      signinRedirect({
        redirect_uri: window.location.href,
      });
    }
  }, [
    auth.activeNavigator,
    auth.isAuthenticated,
    auth.isLoading,
    auth.signinRedirect,
  ]);

  if (auth.isLoading || !auth.isAuthenticated) {
    return "...loading";
  }

  return children;
}

export default App;
