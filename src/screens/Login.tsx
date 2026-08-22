import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { LogoMark } from "../components/Logo";

export const Login: React.FC = () => {
  const { state, login } = useStore();
  const lang = state.language;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username.trim(), password.trim());
    if (ok) {
      setError(null);
      navigate("/", { replace: true });
    } else {
      setError(t(lang, "loginError"));
    }
  };

  return (
    <div className="page auth-shell">
      <LogoMark size={72} />
      <div>
        <div className="wordmark" style={{ fontSize: 26 }}>
          Ledger<span className="ai">AI</span>
        </div>
        <p className="muted" style={{ marginTop: 6 }}>{t(lang, "tagline")}</p>
      </div>

      <form className="auth-card" onSubmit={submit}>
        <div className="field">
          <label htmlFor="username">{t(lang, "username")}</label>
          <input
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">{t(lang, "password")}</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span className="field-error">{error}</span>}
        </div>

        <div className="auth-hint">{t(lang, "loginDemoNote")}</div>

        <button type="submit" className="btn btn-primary btn-block">
          {t(lang, "logIn")}
        </button>
      </form>
    </div>
  );
};
