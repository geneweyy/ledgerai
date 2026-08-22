import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { t } from "../i18n";
import { TopBar } from "../components/TopBar";
import { useToast } from "../components/Toast";
import { LogoMark } from "../components/Logo";

export const Profile: React.FC = () => {
  const { state, updateProfile } = useStore();
  const lang = state.language;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [businessName, setBusinessName] = useState(state.profile.businessName);
  const [ownerName, setOwnerName] = useState(state.profile.ownerName);
  const [phone, setPhone] = useState(state.profile.phone);
  const [businessNameError, setBusinessNameError] = useState<string | null>(null);
  const [ownerNameError, setOwnerNameError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBusiness = businessName.trim();
    const trimmedOwner = ownerName.trim();
    let hasError = false;
    if (!trimmedBusiness) {
      setBusinessNameError(t(lang, "requiredField"));
      hasError = true;
    } else {
      setBusinessNameError(null);
    }
    if (!trimmedOwner) {
      setOwnerNameError(t(lang, "requiredField"));
      hasError = true;
    } else {
      setOwnerNameError(null);
    }
    if (hasError) return;

    updateProfile({ businessName: trimmedBusiness, ownerName: trimmedOwner, phone: phone.trim() });
    showToast(t(lang, "saved"));
  };

  return (
    <div className="screen">
      <TopBar title={t(lang, "profile")} onBack={() => navigate(-1)} />
      <div className="page">
        <div className="profile-avatar-row">
          <LogoMark size={56} />
          <div>
            <div style={{ fontWeight: 600, fontSize: "var(--text-md)" }}>
              {state.profile.businessName || t(lang, "businessName")}
            </div>
            <div className="muted">{state.profile.ownerName || t(lang, "ownerName")}</div>
          </div>
        </div>

        <form className="page" style={{ padding: 0, gap: "var(--space-4)" }} onSubmit={submit}>
          <div className="field">
            <label htmlFor="businessName">{t(lang, "businessName")}</label>
            <input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              maxLength={60}
            />
            {businessNameError && <span className="field-error">{businessNameError}</span>}
          </div>
          <div className="field">
            <label htmlFor="ownerName">{t(lang, "ownerName")}</label>
            <input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              maxLength={60}
            />
            {ownerNameError && <span className="field-error">{ownerNameError}</span>}
          </div>
          <div className="field">
            <label htmlFor="phone">{t(lang, "phoneOptional")}</label>
            <input
              id="phone"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={20}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {t(lang, "save")}
          </button>
        </form>
      </div>
    </div>
  );
};
