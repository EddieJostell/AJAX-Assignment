console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {

	return {

		showNewsByArticle: (article) => {
			console.log(article);
			let newsDiv = `
			<div class="showNews col-md-4">
			<img class="img-responsive pt-15" src="${article.urlToImage}">
			<h5>Headline: ${article.title}</h5>
			<h5>Author: ${article.author}</h5>
			<p>Description: ${article.description}</p>
			<p>Date: ${article.publishedAt}</p>
			<a href="${article.url}">${article.url}</a>
			</div>`;
			newsOutput.innerHTML += newsDiv;
		},
		showNewsBySource: (source) => {
			let sourceDiv = `
			<div class="showNews">
			<img img-responsive pt-15" src="${source.urlsToLogos.medium}">
			<h5>Source: ${source.name}</h5>
			<h5>Category: ${source.category}</h5>
			<p>Description: ${source.description}</p>
			<p>Language: ${source.language}</p>
			<p>Country: ${source.country}</p>
			<a href="${source.url}">${source.url}</a>
			</div>`;
			newsOutput.innerHTML += sourceDiv;
		},
		getLatestNews: () => {
			const url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(url)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
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
					<a href="${news[i].url}">${news[i].url}</a>
					<br>
					<button class="btn btn-outline-danger" value="Interesting">Interesting</button>
					</div>`;
					newsOutput.innerHTML += newsDiv;
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
       // ====================== GENERAL NEWS FUNCTIONS ===============================
       generalNewsSource: () => {
       	const url = "https://newsapi.org/v1/sources?category=general&sortBysAvailable=latest&apiKey=ba003866cd1849ffb405924244eb308e";
       	fetch(url)
       	.then((response) => {
				return response.json(); // Transform the data into json
			})
       	.then(function(data) {
       		console.log(data);
       		newsOutput.innerHTML = "";
       		let source = data.sources;
       		for (var i = 0; i < source.length; i++) {
       			newsMod.showNewsBySource(source[i]);
       		};
       	})
       },

       getTopBBCNews: () => {
       	const urlBBC = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(urlBBC) // Get Fetch method to grab the information from the API
			.then((response) => {
				return response.json();		 // Transform the data into json
			})
			.then(function(data) {
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
		getTopCNNNews: () => {
			const urlCnn = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(urlCnn)
			/*.then((resp) => resp.json()) // Transform the data into json*/
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
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

		// ==================================== SPORTS NEWS FUNCTIONS ==============================
		getSkySportsNews: () => {
			const urlSkySports = "https://newsapi.org/v1/articles?source=sky-sports-news&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(urlSkySports)
			/* .then((resp) => resp.json()) // Transform the data into json*/
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let skySports = data.articles;

				for (var i = 0; i < skySports.length; i++) {
					newsMod.showNewsByArticle(skySports[i]);
				};          
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getFootballItaliaNews: () => {
			const italiaURL = "https://newsapi.org/v1/articles?source=football-italia&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(italiaURL)
			.then((response) => {
				return response.json();  // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let footballItalia = data.articles;

				for (var i = 0; i < footballItalia.length; i++) {
					newsMod.showNewsByArticle(footballItalia[i]);
				}; 
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getSportsNews: () => {
			const url = "https://newsapi.org/v1/sources?category=sport&language=en&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(url)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let source = data.sources;
				for (var i = 0; i < source.length; i++) {
					newsMod.showNewsBySource(source[i]);
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		// ======================== BUSINESS NEWS FUNCTIONS =============================
		getWallstreetNews: () => {
			const wallStreetUrl = "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";
			fetch(wallStreetUrl)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let wallStreet = data.articles;
				for (var i = 0; i < wallStreet.length; i++) {
					newsMod.showNewsByArticle(wallStreet[i]);
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		}, 
		getFtimesNews: () => {
			const fTimesUrl = " https://newsapi.org/v1/articles?source=financial-times&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";
			fetch(fTimesUrl)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let fTimes= data.articles;
				for (var i = 0; i < fTimes.length; i++) {
					newsMod.showNewsByArticle(fTimes[i]);
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getBusinessSources: () => {
			const businessUrl = "https://newsapi.org/v1/sources?language=en&category=business&apiKey=ba003866cd1849ffb405924244eb308e";
			fetch(businessUrl)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let bSource = data.sources;
				for (var i = 0; i < bSource.length; i++) {
					newsMod.showNewsBySource(bSource[i]);
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getTechNews: () => {
			const techUrl = "https://newsapi.org/v1/sources?category=technology&country=us&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(techUrl)
			/*.then((resp) => resp.json()) // Transform the data into json*/
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let tech = data.sources;

				for (var i = 0; i < tech.length; i++) {
					let techDiv = `
					<div class="showNews">
					<img class="img-responsive pt-15" src="${tech[i].urlsToLogos.medium}">
					<h5>Source: ${tech[i].name}</h5>
					<h5>Category: ${tech[i].category}</h5>
					<p>Description: ${tech[i].description}</p>
					<p>Language: ${tech[i].language}</p>
					<a href="${tech[i].url}">${tech[i].url}</a>
					</div>`;
					newsOutput.innerHTML += techDiv;
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		// ============================ MUSIC NEWS FUNCTIONS ===========================
		getMTVNews: () => {
			const urlMTV = "https://newsapi.org/v1/articles?source=mtv-news&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(urlMTV)
			/* .then((resp) => resp.json()) // Transform the data into json*/
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let mtvNews = data.articles;
				for (var i = 0; i < mtvNews.length; i++) {
					newsMod.showNewsByArticle(mtvNews[i]);
				}; 
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getMTVUKNews: () => {
			const urlMTVUK = "https://newsapi.org/v1/articles?source=mtv-news-uk&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";
			fetch(urlMTVUK)
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let mtvUKNews = data.articles;
				for (var i = 0; i < mtvUKNews.length; i++) {
					newsMod.showNewsByArticle(mtvUKNews[i]);
				}; 
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		getGamingNews: () => {
			const gameUrl = "https://newsapi.org/v1/sources?category=gaming&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(gameUrl)
			/*.then((resp) => resp.json()) // Transform the data into json*/
			.then((response) => {
				return response.json();
			})
			.then(function(data) {
				console.log(data);
				newsOutput.innerHTML = "";
				let game = data.sources;

				for (var i = 0; i < game.length; i++) {
					let gameDiv = `
					<div class="showNews">
					<img class="img-responsive pt-15" src="${game[i].urlsToLogos.medium}">
					<h5>Source: ${game[i].name}</h5>
					<h5>Category: ${game[i].category}</h5>
					<p>Description: ${game[i].description}</p>
					<p>Language: ${game[i].language}</p>
					<p>Country: ${game[i].country}</p>
					<a href="${game[i].url}">${game[i].url}</a>
					</div>`;
					newsOutput.innerHTML += gameDiv;
				};
			})
			.catch(function(error) {
				console.log(error);
			});
		}
	}

})();

newsMod.getLatestNews();
//General News
document.getElementById("cnnNews").addEventListener("click", newsMod.getTopCNNNews);
document.getElementById("bbcNews").addEventListener("click", newsMod.getTopBBCNews);
document.getElementById("sourceOfNews").addEventListener("click", newsMod.generalNewsSource);
//Sports News
document.getElementById("skySportsNews").addEventListener("click", newsMod.getSkySportsNews);
document.getElementById("italiaNews").addEventListener("click", newsMod.getFootballItaliaNews);
document.getElementById("sportsNews").addEventListener("click", newsMod.getSportsNews);
//Music News
document.getElementById("mtvNews").addEventListener("click", newsMod.getMTVNews);
document.getElementById("mtvUkNews").addEventListener("click", newsMod.getMTVUKNews);
//Business News
document.getElementById("insiderNews").addEventListener("click", newsMod.getWallstreetNews);
document.getElementById("bloomNews").addEventListener("click", newsMod.getFtimesNews);
document.getElementById("businessNews").addEventListener("click", newsMod.getBusinessSources);

//document.getElementById("gameNews").addEventListener("click", newsMod.getGamingNews);

//document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);

//document.getElementById("techNews").addEventListener("click", newsMod.getTechNews);