// src/components/DottedBackground.jsx
import React from "react";

const DottedBG = () => (
  <div className="bg-dot-pattern">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="2" fill="#a2ff00" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  </div>
);

export default DottedBG;
