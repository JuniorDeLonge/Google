function searchGoogle() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    const query = searchInput.value;

    if (query.trim() === '') {
        alert('Por favor, insira um termo de pesquisa.');
        return false;
    }

    const cx = 'a31b17ca840904da5';

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyD5FBuMk_7_CCk4ws1qE4Z5uNZaTG7CACY&q=${query}&cx=${cx}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.items);
            searchResults.style.display = 'flex';
        })
        .catch(error => {
            console.error('Erro ao realizar a busca:', error);
        });

    return false;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = '';

    if (!results || results.length === 0) {
        searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.style.textAlign = 'left';
        resultItem.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet}</p>`;
        searchResults.appendChild(resultItem);
    });

}