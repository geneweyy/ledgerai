import React from "react";

export interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconCamera: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8.5Z" />
    <circle cx="12" cy="13" r="3.4" />
  </svg>
);

export const IconMic: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3" />
    <path d="M9 21h6" />
  </svg>
);

export const IconReceipt: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M6 3h12v18l-2.5-1.5L13 21l-1.5-1.5L10 21l-2.5-1.5L6 21V3Z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12.5 9.5 17 19 7" />
  </svg>
);

export const IconWarning: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
    <path d="M12 9.5v4.5" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconChevronBack: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M15 5 8 12l7 7" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" />
  </svg>
);

export const IconEdit: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
    <path d="M14 6.5 17.5 10" />
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M5 7h14" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M6.5 7 7.3 19a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconSettings: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13.5a1.9 1.9 0 0 0 .4 2.1l.1.1a2.3 2.3 0 1 1-3.2 3.2l-.1-.1a1.9 1.9 0 0 0-2.1-.4 1.9 1.9 0 0 0-1.2 1.8v.2a2.3 2.3 0 1 1-4.6 0v-.1a1.9 1.9 0 0 0-1.3-1.8 1.9 1.9 0 0 0-2.1.4l-.1.1a2.3 2.3 0 1 1-3.2-3.2l.1-.1a1.9 1.9 0 0 0 .4-2.1 1.9 1.9 0 0 0-1.8-1.2H4a2.3 2.3 0 1 1 0-4.6h.1a1.9 1.9 0 0 0 1.8-1.3 1.9 1.9 0 0 0-.4-2.1l-.1-.1a2.3 2.3 0 1 1 3.2-3.2l.1.1a1.9 1.9 0 0 0 2.1.4H11a1.9 1.9 0 0 0 1.2-1.8V4a2.3 2.3 0 1 1 4.6 0v.1a1.9 1.9 0 0 0 1.2 1.8 1.9 1.9 0 0 0 2.1-.4l.1-.1a2.3 2.3 0 1 1 3.2 3.2l-.1.1a1.9 1.9 0 0 0-.4 2.1V11a1.9 1.9 0 0 0 1.8 1.2h.2a2.3 2.3 0 1 1 0 4.6h-.1a1.9 1.9 0 0 0-1.8 1.2Z" opacity="0" />
    <path d="M4.6 9a7.7 7.7 0 0 0 0 6M19.4 9a7.7 7.7 0 0 1 0 6M9 4.6a7.7 7.7 0 0 1 6 0M9 19.4a7.7 7.7 0 0 0 6 0" />
  </svg>
);

export const IconChart: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <rect x="7" y="13" width="2.6" height="7" rx="0.6" fill="currentColor" stroke="none" />
    <rect x="12" y="9" width="2.6" height="11" rx="0.6" fill="currentColor" stroke="none" />
    <rect x="17" y="6" width="2.6" height="14" rx="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconDocument: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M7 3h7l4 4v14H7Z" />
    <path d="M14 3v4h4" />
    <path d="M9.5 12h5M9.5 15.5h5M9.5 8.5h2" />
  </svg>
);

export const IconShare: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="17.5" cy="6" r="2.2" />
    <circle cx="17.5" cy="18" r="2.2" />
    <path d="M8 11l7.7-3.8M8 13l7.7 3.8" />
  </svg>
);

export const IconGlobe: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.4 2.3 3.7 5.3 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.3-3.7-8.5S9.6 5.8 12 3.5Z" />
  </svg>
);

export const IconHome: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9.5h12V10" />
    <path d="M10 19.5V14h4v5.5" />
  </svg>
);

export const IconEmptyReceipt: React.FC<IconProps> = ({ size = 36, className }) => (
  <svg {...base(size)} className={className} strokeWidth={1.4}>
    <path d="M6 3h12v18l-2.5-1.5L13 21l-1.5-1.5L10 21l-2.5-1.5L6 21V3Z" />
    <path d="M9 8h6M9 12h6M9 16h3" opacity="0.6" />
  </svg>
);

export const IconSad: React.FC<IconProps> = ({ size = 36, className }) => (
  <svg {...base(size)} className={className} strokeWidth={1.4}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 15.5c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8" />
    <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSun: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
  </svg>
);

export const IconMoon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.8 6.8 0 0 0 10.2 10.2Z" />
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M6 3h4.5l1.5 4-2.2 1.6a11.5 11.5 0 0 0 5.6 5.6L17 12l4 1.5V18a2 2 0 0 1-2 2c-7.2 0-13-5.8-13-13a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconUser: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const IconLogOut: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
    <path d="M9 12h11M17 8l3 4-3 4" />
  </svg>
);

export const IconLock: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IconFlask: React.FC<IconProps> = ({ size = 14, className }) => (
  <svg {...base(size)} className={className}>
    <path d="M10 3h4" />
    <path d="M10.5 3v5.2L5.7 17a1.8 1.8 0 0 0 1.6 2.7h9.4a1.8 1.8 0 0 0 1.6-2.7l-4.8-8.8V3" />
    <path d="M8 14.5h8" />
  </svg>
);
