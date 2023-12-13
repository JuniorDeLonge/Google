document.addEventListener("DOMContentLoaded", function () {
  // @juniordelonge
  var searchInput = document.querySelector(".search_camp input");
  var closerButton = document.getElementById("closer");
  var searchButton = document.querySelector(".search_btn button");
  var acrAddElement = document.querySelector(".ACRAdd.M2vV3");

  var search_text = "";

  // Oculte o elemento ACRAdd por padrão
  acrAddElement.style.display = "none";

  // Adicione um ouvinte de evento de entrada ao campo de pesquisa
  searchInput.addEventListener("input", function () {
    // Adicione a classe 'show' ao botão quando o usuário começar a digitar
    closerButton.classList.add("show");

    // Atualize a variável de texto de pesquisa
    search_text = searchInput.value;

    // Verifique se o campo de pesquisa está vazio
    if (search_text === "") {
      // Se estiver vazio, remova a classe 'show' para ocultar o botão
      closerButton.classList.remove("show");

      // Oculte o elemento ACRAdd
      acrAddElement.style.display = "none";
    } else {
      // Se houver texto, adicione a classe 'show' ao botão
      closerButton.classList.add("show");

      // Mostre o elemento ACRAdd
      acrAddElement.style.display = "block";
    }
  });
  // @juniordelonge

  // Adicione um ouvinte de evento de clique ao botão "closer"
  closerButton.addEventListener("click", function () {
    // Limpe o valor do campo de pesquisa
    searchInput.value = "";

    // Remova a classe 'show' para ocultar o botão
    closerButton.classList.remove("show");

    // Oculte o elemento ACRAdd
    acrAddElement.style.display = "none";
  });

  // Adicione um ouvinte de evento de clique ao botão de pesquisa
  searchButton.addEventListener("click", function () {
    googleSearch();
  });
  // @juniordelonge

  // Adicione um ouvinte de evento de tecla ao campo de pesquisa
  searchInput.addEventListener("keyup", function (e) {
    // Atualize a variável de texto de pesquisa
    search_text = searchInput.value;

    // Verifique se a tecla pressionada é "Enter"
    if (e.key === "Enter") {
      googleSearch();
    }
  });

  function googleSearch() {
    // Verifique se há texto de pesquisa
    if (search_text.length >= 1) {
      // Construa a URL de pesquisa do Google
      var url = "https://google.com/search?q=" + search_text;

      // Redirecione para a URL de pesquisa do Google
      window.location.href = url;
    }
  }
});

// @juniordelonge

function applyDarkMode() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  document.body.classList.toggle("dark-mode", prefersDarkMode);
}

applyDarkMode();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applyDarkMode);

// @juniordelonge
