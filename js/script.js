console.log("AJAX-ASSIGNMENT");

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
			//console.log(article);
			let newsDiv = `
			<div class="showNews col-lg-4 col-md-2 col-sm-2">
			<img class="img-responsive pt-15" src="${article.urlToImage}">
			<h5>Headline: ${article.title}</h5>
			<h5>Author: ${article.author}</h5>
			<p>Description: ${article.description}</p>
			<p>Date: ${article.publishedAt}</p>
			<a href="${article.url}" target="_blank">${article.url}</a>
			<br>
			<button id="btnSave" class="btn btn-outline-danger" value="Save News" data-article='${JSON.stringify(article)}'>Save News</button>
			</div>`;
			newsOutput.innerHTML += newsDiv;
			document.getElementById("btnSave").addEventListener("click", function(event) {
				newsMod.saveFavoriteNews(event);
			});
		},
		showNewsBySource: (source) => {
			let sourceDiv = `
			<div class="showNews col-lg-4 col-md-2 col-sm-2">
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

		
		saveFavoriteNews: (event) =>  {
			//Getting  the data-object from the button that we pressed to save the news to the database
			//and put it into a variable that is fetch POSTED to my "database" (json-server on newsAPI.json). 
			let articleInfo = document.getElementById(event.target.id).dataset.article;

			fetch('http://localhost:3000/articles', {
				method: 'POST', 
				mode: 'cors',
				body: articleInfo,
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
				 //mostInteresting.innerHTML = "";
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
			<div class="showNews col-md-2">
			<img class="img-responsive pt-15" src="${savedArticle.urlToImage}">
			<h5>Headline: ${savedArticle.title}</h5>
			<h5>Author: ${savedArticle.author}</h5>
			<p>Description: ${savedArticle.description}</p>
			<p>Date: ${savedArticle.publishedAt}</p>
			<a href="${savedArticle.url}" target="_blank">${savedArticle.url}</a>
			<br>
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
document.getElementById("btnSave").addEventListener("click", function(event) {
				newsMod.saveFavoriteNews(event);
			});

