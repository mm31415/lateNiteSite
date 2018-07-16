function scrolling () {
  const checkBtn = document.getElementById("check-it");
  const homeBtn = document.getElementById("home-btn");
  const aboutBtn = document.getElementById("about-btn");
  const contactBtn = document.getElementById("contact-btn");

  const homeSection = document.getElementById("home");
  const aboutSection = document.getElementById("about");
  const contactSection = document.getElementById("contact");


  function scrollPageDown(section, firstTime = true) {
    window.scrollBy(0, section.offsetTop / 10);
    if(window.pageYOffset < section.offsetTop - section.offsetTop / 10) {
      window.setTimeout(() => scrollPageDown(section), 30);
    }
  }

  function scrollPageUp(section) {
    const scrollAmt = (section.offsetTop ? section.offsetTop : -150);
    window.scrollBy(0, scrollAmt);
    if(window.pageYOffset > 0) {
      window.setTimeout(() => scrollPageUp(section), 30);
    }
  }

  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollPageDown(aboutSection);
  });

  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollPageUp(homeSection);
  });

}
