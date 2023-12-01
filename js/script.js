// Importe suas chaves de um arquivo de configuração
import { API_KEY, CX_CODE } from './config.js';

let currentPage = 1;
const resultsPerPage = 10;

async function googleSearch(searchType, start) {
    try {
        const searchQuery = document.getElementById('searchInput').value;
        const url = "https://www.googleapis.com/customsearch/v1";
        const params = {
            key: API_KEY,
            cx: CX_CODE,
            q: searchQuery,
            searchType: searchType,
            start: start
        };

        const response = await axios.get(url, { params });
        return response.data.items;
    } catch (error) {
        console.error(`Erro ao buscar resultados de ${searchType}:`, error);
        // Adicione feedback ao usuário aqui
    }
}

async function suggestGoogle() {
    try {
        const items = await googleSearch();
        const suggestions = items.spelling.correctedQuery;

        document.getElementById('suggestions').innerHTML = suggestions ? 'Você quis dizer: ' + suggestions : '';
    } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        // Adicione feedback ao usuário aqui
    }
}

async function searchGoogle(start) {
    try {
        const items = await googleSearch('web', start);
        displayResults(items);
    } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        // Adicione feedback ao usuário aqui
    }
}

async function searchImages(start) {
    try {
        const items = await googleSearch('image', start);
        displayResults(items);
        displayPageNumbers();
        lazyLoadImages();
    } catch (error) {
        console.error("Erro ao buscar resultados de imagens:", error);
        // Adicione feedback ao usuário aqui
    }
}

function displayResults(items) {
    const results = items.map(item => `
        <div class="card">
            <img src="img/placeholder.jpeg" data-src="${item.link}" class="card-img-top lazyload">
            <div class="card-body">
            <h5 class="card-title"><a href="${item.link}" target="_blank">${item.title}</a></h5>
            <p class="card-text">${item.snippet}</p>
            </div>
        </div>
    `);

    document.getElementById('searchResults').innerHTML = results.join('');
}

function lazyLoadImages() {
    const images = document.querySelectorAll('.lazyload');

    images.forEach(image => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.disconnect();
                }
            });
        });

        observer.observe(image);
    });
}

function displayPageNumbers() {
    let pageNumbers = '';
    for (let i = 1; i <= Math.min(10, Math.ceil(totalResults / resultsPerPage)); i++) {
        pageNumbers += `<button onclick="changePage(${i})">${i}</button>`;
    }

    document.getElementById('pageNumbers').innerHTML = pageNumbers;
}

function changePage(page) {
    currentPage = page;
    const start = (currentPage - 1) * resultsPerPage + 1;
    searchGoogle(start);
    searchImages(start);
}
