//Criação e importação do navbar
document.addEventListener("DOMContentLoaded", function() {
    fetch("../../components/navbar/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar navbar:", error));
})