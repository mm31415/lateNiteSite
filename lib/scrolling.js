function scrolling () {
  const checkBtn = document.getElementById("check-it");
  const homeBtn = document.getElementById("home-btn");
  const aboutBtn = document.getElementById("about-btn");
  const contactBtn = document.getElementById("contact-btn");
  
  const homeSection = document.getElementById("home");
  const aboutSection = document.getElementById("about");
  const contactSection = document.getElementById("contact");

  function scrollPage(section, count = 0, ) {
    window.scrollBy(0, section.offsetTop / 10)
    if(count < 9) {
      window.setTimeout(() => scrollPage(section, count + 1), 30);
    }
  }

  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollPage(aboutSection);
  });

}
