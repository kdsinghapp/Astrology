import React from "react";
import { Helmet } from "react-helmet";
export default function seo({ title, description, keywords, url, name, type }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:url" content={window.location.href} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      {/* <meta property="og:type" content={type} /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={url} />

      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      {/* <meta name="twitter:card" content={type} /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:description" content={url} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
