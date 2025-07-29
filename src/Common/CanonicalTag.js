import React, { useEffect } from "react";

const CanonicalTag = () => {
  const canonicalUrl = window.location.href;
  useEffect(() => {
    const linkElement = document.createElement("link");
    linkElement.rel = "canonical";
    linkElement.href = canonicalUrl;

    document.head.appendChild(linkElement);

    return () => {
      // Clean up the added link element when the component is unmounted
      document.head.removeChild(linkElement);
    };
  }, [canonicalUrl]);

  return null;
};

export default CanonicalTag;
