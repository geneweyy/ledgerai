import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStore } from "./store";
import { ToastProvider } from "./components/Toast";
import { Onboarding } from "./screens/Onboarding";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { ManualEntry } from "./screens/ManualEntry";
import { PhotoFlow } from "./screens/PhotoFlow";
import { VoiceFlow } from "./screens/VoiceFlow";
import { EntryDetail } from "./screens/EntryDetail";
import { CatalogManage } from "./screens/CatalogManage";
import { Reports } from "./screens/Reports";
import { Tax } from "./screens/Tax";
import { Settings } from "./screens/Settings";
import { Profile } from "./screens/Profile";

const AppRoutes: React.FC = () => {
  const { state } = useStore();

  if (!state.loggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  if (!state.onboarded) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log/manual" element={<ManualEntry />} />
      <Route path="/log/photo" element={<PhotoFlow />} />
      <Route path="/log/voice" element={<VoiceFlow />} />
      <Route path="/log/catalog" element={<Navigate to="/catalog" replace />} />
      <Route path="/entry/:id" element={<EntryDetail />} />
      <Route path="/catalog" element={<CatalogManage />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/tax" element={<Tax />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ToastProvider>
        <HashRouter>
          <div className="device-shell">
            <AppRoutes />
          </div>
        </HashRouter>
      </ToastProvider>
    </StoreProvider>
  );
};

export default App;
