document.addEventListener('DOMContentLoaded', function() {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const hideThreshold = 80;
  const showThreshold = 40;
  let isHeaderHidden = false;

  window.addEventListener('scroll', function() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > hideThreshold) {
      if (currentScroll > lastScrollTop && !isHeaderHidden) {
        header.style.top = "-100px";
        isHeaderHidden = true;
    } else if (currentScroll < lastScrollTop && isHeaderHidden && (lastScrollTop - currentScroll) >= showThreshold) {
        header.style.top = "0";
        isHeaderHidden = false;
    }
} else {
    header.style.top = "0";
    isHeaderHidden = false;
}
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});