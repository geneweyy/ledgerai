import React from "react";

export const LogoMark: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#16181D" />
    <path d="M13 10V28H27" stroke="#028090" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M13 24L18 18L22 21L28 12" stroke="#02C39A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="28" cy="12" r="2.4" fill="#02C39A" />
  </svg>
);

export const Wordmark: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <span className="wordmark" style={{ fontSize: size }}>
    Ledger<span className="ai">AI</span>
  </span>
);

export const LogoLockup: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <div className="logo-mark">
    <LogoMark size={size} />
    <Wordmark size={size * 0.6} />
  </div>
);
