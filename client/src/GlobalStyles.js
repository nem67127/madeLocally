import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
  --main-background-color: #eff7ff;
  --dark-blue: #2e6bc5;
  --water-blue: #C6E2FF;
  --font-dm-serif: 'DM Serif Display', serif;
  --font-thasa: 'Thasadith', sans-serif;
}
*,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Thasadith', sans-serif;
    font-weight: bold;
  }

html, body {
    max-width: 100vw;
    height: 100vh;
}
body {
    line-height: 1.5;
}

html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}
`;
