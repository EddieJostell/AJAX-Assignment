const newsMod = (() => {

	return {
		getLatestNews: () => {
			const url = "https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			fetch(url)
			.then((response) => {
				return response.json(); // Transform the data into json
			})
			.then(function(data) {
				//console.log(data);
				let news = data.articles;
				newsOutput.innerHTML = "";
				for (var i = 0; i < news.length; i++) {
					//If information is missing dont write out "null" instead.
					if (news[i].author === null || news[i].publishedAt === null) {
						news[i].author = "";
						news[i].publishedAt = "";
						let newsDiv = `
						<div class="showNews card col-lg-2 col-md-4 col-sm-6 col-xs-12">
						<img class="card-img-top img-responsive pt-15" src="${news[i].urlToImage}">
						<div class="card-block">
						<h5 class="card-title">Headline: ${news[i].title}</h5>
						<h5 class="card-title">Author: ${news[i].author}</h5>
						<p class="card-text">Description: ${news[i].description}</p>
						<p class="card-text">Date: ${news[i].publishedAt}</p>
						<a class="card-text" href="${news[i].url}" target="_blank">${news[i].url}</a>
						<br>
						<button id="btnSave" class="btn btn-outline-danger" value="Save News">Save News</button>
						</div>
						</div>`;
						newsOutput.innerHTML += newsDiv;
					}
					else {
						let newsDiv = `
						<div class="showNews card col-lg-2 col-md-4 col-sm-6 col-xs-12">
						<img class="card-img-top img-responsive pt-15" src="${news[i].urlToImage}">
						<div class="card-block">
						<h5 class="card-title">Headline: ${news[i].title}</h5>
						<h5 class="card-title">Author: ${news[i].author}</h5>
						<p class="card-text">Description: ${news[i].description}</p>
						<p class="card-text">Date: ${news[i].publishedAt}</p>
						<a class="card-text" href="${news[i].url}" target="_blank">${news[i].url}</a>
						<br>
						<button id="btnSave" class="btn btn-outline-danger" value="Save News">Save News</button>
						</div>
						</div>`;
						newsOutput.innerHTML += newsDiv;
					}

				};
			})
			.catch(function(error) {
				console.log(error);
			});
		},
			//FindArticleById is a function that is called when pressing on a link to a specific news station in the navbar on the DOM. (BBC for example).
			//The function activates getApiByArticles and sends along the id of the EventListnener that has been activated when you press on the link.
			//getApiByArticles takes the ID as a parameter and puts it into fetchGetArticles along with the API URL that is used to get information from the News API that I am using.
			//That way I dont have to make a new function and a new API URL for every news station that I want to show news from.
			//fetchGetArticles then makes a fetch GET request to the API and you get data back formated in JSON, then I loop through the array of objekts (articles) and send them to
			//showNewsByArticle where I use a template literal to display the articles on the HTML.

			//Same procedure for findSourcesByCategory, getApiBySourcesm fetchGetSources and showNewsBySources
			//But instead of showing articles from different News stations you get different news stations within different categories.
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
		showNewsByArticle: (article) =>  {

			let newsDiv = `
			<div class="showNews card col-lg-2 col-md-4 col-sm-6 col-xs-12">
			<img class="card-img-top img-responsive pt-15" src="${article.urlToImage}">
			<div class="card-block">
			<h5 class="card-title">Headline: ${article.title}</h5>
			<h5 class="card-title">Author: ${article.author}</h5>
			<p class="card-text">Description: ${article.description}</p>
			<p class="card-text">Date: ${article.publishedAt}</p>
			<a class="card-text" href="${article.url}" target="_blank">${article.url}</a>
			<br>
			<button id="btnSave" class="btnSave btn btn-outline-danger" value="Save News" data-article="${JSON.stringify(article).replace(/"/g,"'")}">Save News</button>
			</div>
			</div>`;
			newsOutput.innerHTML += newsDiv;
			let buttons = document.getElementsByClassName("btnSave");
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener("click", function() {
					newsMod.saveFavoriteNews(this);
				});
			}
		},
		showNewsBySource: (source) => {
			let sourceDiv = `
			<div class="showNews card col-lg-2 col-md-4 col-sm-6 col-xs-12">
			<img class="card-img-top img-responsive pt-15" src="${source.urlsToLogos.medium}">
			<div class="card-block">
			<h5 class="card-title">ID: ${source.id}</h5>
			<h5 class="card-title">Source: ${source.name}</h5>
			<h5 class="card-title">Category: ${source.category}</h5>
			<p class="card-text">Description: ${source.description}</p>
			<p class="card-text">Language: ${source.language}</p>
			<p class="card-text">Country: ${source.country}</p>
			<a class="card-text" href="${source.url}" target="_blank">${source.url}</a>
			</div>
			</div>`;
			newsOutput.innerHTML += sourceDiv;
		},

		
		saveFavoriteNews: (button) =>  {
			//Getting  the data-object from the button that we pressed to save the news to the database
			//and put it into a variable that is fetch POSTED to my "database" (json-server on newsAPI.json). 
		  

			fetch('http://localhost:3000/articles', {
				method: 'POST', 
				mode: 'cors',
				body: JSON.parse(button.dataset.article.replace(/'/g,'"')),
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(function(data) {
				alert("Article saved in the database");
			})
			.catch(function (error) {  
				console.log('Requestet failade', error);  
			});
			newsMod.getArticlesFromDatabase();
		},
		getArticlesFromDatabase: () => {
			fetch('http://localhost:3000/articles') 
			.then((response) => {
				return response.json();		 // Transform the data into json
			})
			.then(function(savedNews) { 
				console.log(savedNews);
			// Puts the fetch response into the parameter "data".
				 mostInteresting.innerHTML = "";
				 console.log(savedNews.length);
				 for (var i = 0; i < savedNews.length; i++) {
				 	newsMod.showSavedArticlesOnHtml(savedNews[i]);
				 };
				})
			.catch(function(error) {
				console.log(error);
			});		
		},
		showSavedArticlesOnHtml: (savedArticle) => {
			let savedNewsDiv = `
			<div class="showNews card col-lg-2 col-md-4 col-sm-6 col-xs-12">
			<img class="card-img-top img-responsive pt-15" src="${savedArticle.urlToImage}">
			<div class="card-block">
			<h5 class="card-title">Headline: ${savedArticle.title}</h5>
			<h5 class="card-title">Author: ${savedArticle.author}</h5>
			<p class="card-text">Description: ${savedArticle.description}</p>
			<p class="card-text">Date: ${savedArticle.publishedAt}</p>
			<a class="card-text" href="${savedArticle.url}" target="_blank">${savedArticle.url}</a>
			</div>
			</div>`;
			mostInteresting.innerHTML += savedNewsDiv;
			/*document.getElementById("btnDelete").addEventListener("click", function() {
				//newsMod.saveFavoriteNews();
			});
        <button id="btnDelete" class="btn btn-outline-danger" value="Save News">Save News</button>
        */
      }
    }
  })();

  newsMod.getLatestNews();
//Latest News Reddit
//document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);
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
/*document.getElementById("btnSave").addEventListener("click", function(event) {
				newsMod.saveFavoriteNews(event);
			});
			*/