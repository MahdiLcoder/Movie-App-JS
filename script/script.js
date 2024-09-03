
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://search.tmdb.org/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();
	return data.results;
}

function showMovies(movies) {

	main.innerHTML = '';

	movies.forEach((movie) => {
		if (movie.title && movie.poster_path && movie.vote_average && movie.overview) {
			const { title, poster_path, vote_average, overview } = movie;
			const movieEl = document.createElement('div');
			movieEl.classList.add('movie');
			movieEl.innerHTML = `
				<img src="${IMG_PATH + poster_path}" alt="${title}">
				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
				<div class="overview">
					<h3>Overview</h3>
					${overview}
				</div>
			`;
			main.appendChild(movieEl);
		}
	});
}

function getClassByRate(vote) {
	if (typeof vote === 'number') {
		if (vote >= 8) {
			return 'green';
		} else if (vote >= 5) {
			return 'orange';
		} else {
			return 'red';
		}
	} else {
		return 'red';
	}
}

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL).then(movies => showMovies(movies));

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchTerm = search.value;
	if (searchTerm) {
		const res = await fetch(SEARCH_API + searchTerm);
		const data = await res.json();
		showMovies(data.results);
	}

	search.value = '';
});