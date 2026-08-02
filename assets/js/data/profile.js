/* ============================================================
   WHO — identity, contact, and the strings that repeat on every
   page. Edit here once and every layout picks the change up.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.profile = {
  name: "김도윤",
  nameLatin: "Kim Doyoon — Kevin Kim",
  /* running header/footer marks */
  mark: "KIM DOYOON",
  markLatin: "KEVIN KIM",
  runningFoot: "KIM DOYOON — PORTFOLIO",

  eyebrow: "PORTFOLIO — GAME DEVELOPER &amp; TECHNICAL PM · 2023—2026",
  role: "World Maker, Simulator Engineer",
  thesis: "<em>가상과 현실의 벽을 부수는 것</em>이 제 인생의 궁극적인 목표입니다.",
  photo: { src: "assets/img/profile.jpg", alt: "김도윤 프로필 사진" },

  chips: ["#Develop PM", "#Engineer", "#Unreal", "#Unity", "#Network"],

  /* keyed so a contact block can pick its own order per page */
  contact: {
    github:  { label: "GITHUB",  text: "Kevin04261004",        href: "https://github.com/Kevin04261004",        external: true },
    youtube: { label: "YOUTUBE", text: "@kimdoyoon06",          href: "https://www.youtube.com/@kimdoyoon06",    external: true },
    mail:    { label: "MAIL",    text: "kdystudy0426@gmail.com", href: "mailto:kdystudy0426@gmail.com" },
    tel:     { label: "TEL",     text: "010-8867-6884",          href: "tel:01088676884" }
  },
  /* order used on the cover */
  contactOrder: ["github", "youtube", "mail", "tel"]
};
