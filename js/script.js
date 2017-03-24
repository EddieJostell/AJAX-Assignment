console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {

	return {

		showNewsByArticle: (article) => {
			console.log(article);
			let newsDiv = `
			<div class="showNews col-md-4" data-article="${JSON.stringify(article)}">
			<img class="img-responsive pt-15" src="${article.urlToImage}">
			<h5>Headline: ${article.title}</h5>
			<h5>Author: ${article.author}</h5>  
			<p>Description: ${article.description}</p>
			<p>Date: ${article.publishedAt}</p>
			<a href="${article.url}" target="_blank">${article.url}</a>
			<br>
			<button id="btnSave" class="btn btn-outline-danger" value="Save News">Save News</button>
			</div>`;
			newsOutput.innerHTML += newsDiv;
			document.getElementById("btnSave").addEventListener("click", newsMod.fetchPostArticles);
		},
		showNewsBySource: (source) => {
			let sourceDiv = `
			<div class="showNews">
			<img class="img-responsive pt-15" src="${source.urlsToLogos.medium}">
			<h5>ID: ${source.id}</h5>
			<h5>Source: ${source.name}</h5>
			<h5>Category: ${source.category}</h5>
			<p>Description: ${source.description}</p>
			<p>Language: ${source.language}</p>
			<p>Country: ${source.country}</p>
			<a href="${source.url}" target="_blank">${source.url}</a>
			</div>`;
			newsOutput.innerHTML += sourceDiv;
		},

		fetchGetArticles: (apiArticleUrl) => {
			fetch(apiArticleUrl) // Get Fetch method to grab the information from the API
			.then((response) => {
				return response.json();		 // Transform the data into json
			})
			.then(function(data) { // Puts the fetch response into the parameter "data".
				let news = data.articles;
				newsOutput.innerHTML = "";
				for (var i = 0; i < news.length; i++) {
					newsMod.showNewsByArticle(news[i]);
				};          
			})
			.catch(function(error) {
				console.log(error);
			});		
		}, 
		fetchGetSources: (apiSourceUrl) => {
			fetch(apiSourceUrl)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				//console.log(data);
				newsOutput.innerHTML = "";
				let source = data.sources;
				for (var i = 0; i < source.length; i++) {
					newsMod.showNewsBySource(source[i]);
				};
			})
			.catch(function(error){
				console.log(error);
			});
		},
		findArticleById(){
			newsMod.getApiByArticles(this.id);
		},
		findSourceByCategory() {
			newsMod.getApiBySources(this.id);
		},
		getApiByArticles: (inputSrc) => {
			newsMod.fetchGetArticles(`https://newsapi.org/v1/articles?source=${inputSrc}&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e`);
		},
		getApiBySources: (inputCat) => {
			newsMod.fetchGetSources(`https://newsapi.org/v1/sources?category=${inputCat}&apiKey=ba003866cd1849ffb405924244eb308e`);
		},
		getLatestNews: () => {
			const url = "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(url)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				//console.log(data);
				let news = data.articles;
				newsOutput.innerHTML = "";
				for (var i = 0; i < news.length; i++) {
					let newsDiv = `
					<div class="showNews col-md-4">
					<img class="img-responsive pt-15" src="${news[i].urlToImage}">
					<h5>Headline: ${news[i].title}</h5>
					<h5>Author: ${news[i].author}</h5>
					<p>Description: ${news[i].description}</p>
					<p>Date: ${news[i].publishedAt}</p>
					<a href="${news[i].url}" target="_blank">${news[i].url}</a>
					<br>
					<button id="btnSave" class="btn btn-outline-danger" value="Save News">Save News</button>
					</div>`;
					newsOutput.innerHTML += newsDiv;
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		fetchPostArticles () {
			fetch('http://localhost:3000/movies', {
				method: 'POST', 
				mode: 'cors',
				body: JSON.parse(this.dataset.article),
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(function(data) {
				console.log(data);
				return data;
			})
			.catch(function(error) {
               console.log(error);
			});
		}
	}

})();

newsMod.getLatestNews();
//Latest News Reddit
document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);
//General News
document.getElementById("cnn").addEventListener("click", newsMod.findArticleById);
document.getElementById("bbc-news").addEventListener("click", newsMod.findArticleById);
document.getElementById("general").addEventListener("click", newsMod.findSourceByCategory);
//Business News
document.getElementById("the-wall-street-journal").addEventListener("click", newsMod.findArticleById);
document.getElementById("financial-times").addEventListener("click", newsMod.findArticleById);
document.getElementById("business").addEventListener("click", newsMod.findSourceByCategory);
//Sports News
document.getElementById("sky-sports-news").addEventListener("click", newsMod.findArticleById);
document.getElementById("football-italia").addEventListener("click", newsMod.findArticleById);
document.getElementById("sport").addEventListener("click", newsMod.findSourceByCategory);
//Music News
document.getElementById("mtv-news").addEventListener("click", newsMod.findArticleById);
document.getElementById("mtv-news-uk").addEventListener("click", newsMod.findArticleById);
document.getElementById("music").addEventListener("click", newsMod.findSourceByCategory);
//Entertainment News
document.getElementById("entertainment-weekly").addEventListener("click", newsMod.findArticleById);
document.getElementById("the-lad-bible").addEventListener("click", newsMod.findArticleById);
document.getElementById("entertainment").addEventListener("click", newsMod.findSourceByCategory);
//Science and Nature News
document.getElementById("national-geographic").addEventListener("click", newsMod.findArticleById);
document.getElementById("new-scientist").addEventListener("click", newsMod.findArticleById);
document.getElementById("science-and-nature").addEventListener("click", newsMod.findSourceByCategory);
//Technology News
document.getElementById("techcrunch").addEventListener("click", newsMod.findArticleById);
document.getElementById("the-verge").addEventListener("click", newsMod.findArticleById);
document.getElementById("technology").addEventListener("click", newsMod.findSourceByCategory);
// Gaming News
document.getElementById("ign").addEventListener("click", newsMod.findArticleById);
document.getElementById("polygon").addEventListener("click", newsMod.findArticleById);
document.getElementById("gaming").addEventListener("click", newsMod.findSourceByCategory);
//document.getElementById("techNews").addEventListener("click", newsMod.getTechNews);

//GET POST EventListener
//document.getElementById("btnSave").addEventListener("click", newsMod.fetchPostArticles);