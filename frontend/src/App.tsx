import { BrowserRouter, Route, Routes } from "react-router";
import { PublicApp } from "./PublicApp.tsx";
import { SecuredApp } from "./SecuredApp.tsx";
import { AppLayout } from "./AppLayout.tsx";
import { useCallback } from "react";

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
          <Route path="/secured" element={<SecuredApp token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
