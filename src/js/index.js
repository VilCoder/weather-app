import "../css/reset.css";
import "../css/styles.css";
import "../css/responsive.css";

import DOM from "./DOM";
import initCarrousel from "./carrousel";

document.addEventListener("DOMContentLoaded", async () => {
  await DOM();
  initCarrousel();
});
