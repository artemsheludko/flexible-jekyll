window.onload = () => {
  let btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.hasAttribute("url")) {
        window.location.href = btn.getAttribute("url");
      }
    });
  });
};
