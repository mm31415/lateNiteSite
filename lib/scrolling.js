function scrolling () {
  const checkBtn = document.getElementById("check-it");
  const homeBtn = document.getElementById("home-btn");
  const aboutBtn = document.getElementById("about-btn");
  const contactBtn = document.getElementById("contact-btn");
  let prevBtn = document.getElementsByClassName("highlight")[0];

  const homeSection = document.getElementById("home");
  const aboutSection = document.getElementById("about");
  const contactSection = document.getElementById("contact");
  const navBar = document.getElementById("nav-header");


  function scrollPage(section, scrollAmt) {
    window.scrollBy(0, scrollAmt);
    if(scrollAmt > 0) {
      if(window.pageYOffset !== section.offsetTop) {
        if(section.offsetTop - window.pageYOffset < scrollAmt) {
          const newScrollAmt = section.offsetTop - window.pageYOffset;
          window.setTimeout(() => scrollPage(section, newScrollAmt), 30);
        } else {
          window.setTimeout(() => scrollPage(section, scrollAmt), 30);
        }
      }
    } else if(scrollAmt < 0) {
      if(window.pageYOffset !== section.offsetTop) {
        if(section.offsetTop - window.pageYOffset > scrollAmt) {
          const newScrollAmt = section.offsetTop - window.pageYOffset;
          window.setTimeout(() => scrollPage(section, newScrollAmt), 30);
        } else {
          window.setTimeout(() => scrollPage(section, scrollAmt), 30);
        }
      }
    }
  }

  document.addEventListener("scroll", (e) => {
    if(window.pageYOffset >= homeSection.offsetTop &&
          window.pageYOffset < aboutSection.offsetTop) {
      prevBtn.classList.remove("highlight");
      homeBtn.classList.add("highlight");
      prevBtn = homeBtn;

    } else if(window.pageYOffset >= aboutSection.offsetTop &&
          window.pageYOffset < contactSection.offsetTop) {
      prevBtn.classList.remove("highlight");
      aboutBtn.classList.add("highlight");
      prevBtn = aboutBtn;
    } else {
      prevBtn.classList.remove("highlight");
      contactBtn.classList.add("highlight");
      prevBtn = contactBtn;
    }
  });

  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const scrollAmt = (aboutSection.offsetTop - window.pageYOffset) / 10;
    scrollPage(aboutSection, scrollAmt);
  });

  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const scrollAmt = (homeSection.offsetTop - window.pageYOffset) / 10;
    scrollPage(homeSection, scrollAmt);
  });

  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const scrollAmt = (aboutSection.offsetTop - window.pageYOffset) / 10;
    scrollPage(aboutSection, scrollAmt);
  });

  contactBtn.addEventListener("click", (e) => {
    debugger
    e.preventDefault();
    const scrollAmt = (contactSection.offsetTop - window.pageYOffset) / 10;
    scrollPage(contactSection, scrollAmt);
  });

}
