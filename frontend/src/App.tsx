import { BrowserRouter, Route, Routes } from "react-router";
import { PublicApp } from "./PublicApp.tsx";
import { SecuredApp } from "./SecuredApp.tsx";
import { AppLayout } from "./AppLayout.tsx";
import { hasAuthParams, useAuth } from "react-oidc-context";
import { type ReactNode, useCallback, useEffect } from "react";

function App() {
  const { signoutRedirect, isAuthenticated, user } = useAuth();

  // 302
  const handleLogout = useCallback(() => {
    signoutRedirect({ post_logout_redirect_uri: "http://localhost:3000/" });
  }, [signoutRedirect]);

  // 403
  const username = user?.profile?.name;
  const token = user?.access_token;

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
