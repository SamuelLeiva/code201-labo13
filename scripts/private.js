const btnLogout = document.getElementById("logout");

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("logged");
  window.location.href = "./index.html";
});
