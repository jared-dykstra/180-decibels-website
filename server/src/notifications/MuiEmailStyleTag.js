import React from 'react'

/* eslint-disable react/no-danger */

// NOTE: external links are for testing only - the CSS should be embedded in production
const MuiEmailStyleTag = () => [
  // <link
  //   key="cdn"
  //   href="https://cdn.muicss.com/mui-0.9.41/email/mui-email-styletag.css"
  //   rel="stylesheet"
  // />,
  <style
    key="local"
    dangerouslySetInnerHTML={{
      __html: `
/**
 * MUI Colors module
 */
/**
 * MUI Email Styletag
 */
#outlook a {
  padding: 0;
}

.ReadMsgBody {
  width: 100%;
}

.ExternalClass {
  width: 100%;
}

.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
  line-height: 100%;
}

.mui-container-fixed {
  width: 600px;
  display: block;
  margin: 0 auto;
  clear: both;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
}`
    }}
  />
]

export default MuiEmailStyleTag
