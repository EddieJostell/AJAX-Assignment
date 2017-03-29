//Module pattern
//Simple and effective pattern that I use so I feel that
//I am in control of how I structure my code.
const newsMod = (() => {

	return {
		//First function that contains everything for a AJAX call.
		//API URL that contains the information I want to gather.
		//fetch GET method that makes a REQUEST to the API through the URL with the specified parameters I have chosen.
		//fetch GET gets a response back that is formated into JSON that is sent forward in the fetch GET method.
		//The information is looped through and put on the DOM with a template literal.
		//If something goes wrong in the fetch GET process it will be caught and a error message will be delivered in the console.
		getLatestNews: () => {
			newsOutput.innerHTML = "";
			let newsDiv = `
			<div class="col-lg-6 m-auto col-md-10 col-sm-12">
			<div class="showNews card">
			<img class="card-img-top img-responsive pt-15" src="img/news.jpg">
			<div class="card-block">
			<h2 class="card-title">Welcome to my News Hub!</h2>
			<h3 class="card-text">Here you can find news articles from some of the largest news outlets in the world.</h3> 
			<h3 class="card-text">If you want to save news to read at a later time just press the button "Save News" and it will be available at the bottom of the page.</h3>
			<h3>If you want to read even more news there are several categorial links to other news outlests aswell, Enjoy!</h3>
			</div>
			</div>
			</div>`;
			newsOutput.innerHTML += newsDiv;	
		},
			//FindArticleById is a function that is called when pressing on a link to a specific news station in the navbar on the DOM. (BBC for example).
			//The function activates getApiByArticles and sends along the id of the EventListnener that has been activated when you press on the link.
			//getApiByArticles takes the ID as a parameter and puts it into fetchGetArticles along with the API URL that is used to get information from the News API that I am using.
			//That way I dont have to make a new function and a new API URL for every news station that I want to show news from.
			//fetchGetArticles then makes a fetch GET request to the API and you get data back formated in JSON, then I loop through the array of objects (articles) and send them to
			//showNewsByArticle where I use a template literal to display the articles on the HTML.

			//Same procedure for findSourcesByCategory, getApiBySourcesm fetchGetSources and showNewsBySources
			//But instead of showing articles from different News stations you get different news stations within different categories.
			//The functions are written this way so that "this" is not bound to the function.
			findArticleById() {
				//Hide the div that is gonna show the news articles 
				//while the data is fetched and show the loading gif.
				$('#newsOutput').removeClass('visible');
				$('#loading').show();
				newsMod.getApiByArticles(this.id);
			},
			findSourceByCategory() {
				//Hide the div that is gonna show the news stations
				//while the data is fetched and show the loading gif.
				$('#newsOutput').removeClass('visible');
				$('#loading').show();
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
				//The fetch is done asynchronous so while the information is looped through the function activating the loading indicator is running aswell.
				let news = data.articles;
				newsOutput.innerHTML = "";
				for (var i = 0; i < news.length; i++) {
					newsMod.showNewsByArticle(news[i]);
				}; 
				newsMod.showNhideMagic();         
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
				newsOutput.innerHTML = "";
				let source = data.sources;
				for (var i = 0; i < source.length; i++) {
					newsMod.showNewsBySource(source[i]);
				};
				newsMod.showNhideMagic();
			})
			.catch(function(error){
				console.log('Request failed', error); 
			});
		},
		//Function with template literal to show articles on the page.
		//Information comes from fetchGetArticle.
		showNewsByArticle: (article) =>  {
			//Some articles dont have a author or publishing date so instead of it saying null
			//It will say Author or Date not listed.
			if (article.author === null) {
				article.author = "not listed";		
			}
			if (article.publishedAt === null) {
				article.publishedAt = "not listed";
			}
			let newsDiv = `
			<div class="col-lg-3 col-md-6 col-sm-12">
			<div class="showNews card">
			<img class="card-img-top img-responsive pt-15" src="${article.urlToImage}">
			<div class="card-block">
			<h5 class="card-title">Headline: ${article.title}</h5>
			<h5 class="card-title">Author: ${article.author}</h5>
			<p class="card-text">Description: ${article.description}</p>
			<p class="card-text">Date published: ${article.publishedAt}</p>
			<a class="card-text" href="${article.url}" target="_blank">${article.url}</a>
			<br>
			<button id="btnSave" class="btnSave btn btn-success" value="Save News" data-article='${JSON.stringify(article).replace(/'/g,"’")}'>Save News</button>
			</div>
			</div>
			</div>`;
			newsOutput.innerHTML += newsDiv;
				//When you press the "Save News" button you save the articles information in a data-object stored in the button itself
				//The button becomes an array with the article information that you loop through and send 
				//to the savedFavoriteNews function that makes a get POST to the json-server.
				//When you press the button the div that is going to hold the saved news is hidden and the loading gif is triggered.
				let buttons = document.getElementsByClassName("btnSave");
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].addEventListener("click", function() {
						$('#mostInteresting, #newsOutput').removeClass('visible');
						$('#loading').show();
						newsMod.saveFavoriteNews(this);
						console.log(this);
					});
				}
			},
			showNewsBySource: (source) => {
				let sourceDiv = `
				<div class="col-lg-3 col-md-6 col-sm-12">
				<div class="showNews card">
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
				</div>
				</div>`;
				newsOutput.innerHTML += sourceDiv;
				newsMod.showNhideMagic();
			},
			saveFavoriteNews: (button) =>  {
			//Getting the save button and in the body for the fetch POST I specify that I want to send the data-object to my "database" (herokuDB). 
			//If something goes wrong the .catch function will say it failed and give a error message statitng what went wrong.
			fetch('http://localhost:3000/articles', {
				method: 'POST', 
				mode: 'cors',
				body: button.dataset.article,
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(function(data) {
	       //Call on the function that is going to do the fetch GET from the server to show the articles on the webpage.
	       //invoked here in the .then callback function to make sure that you dont try to fetch GET something that hasnt been fetch POSTED
	       //to the database yet since its done asynchronously.		
	       newsMod.getArticlesFromDatabase();
	   })
			.catch(function (error) {  
				console.log('Request failed', error);  
			});
		},
		getArticlesFromDatabase: () => {
			//fetch GET the saved articles from the "database" and format them into JSON.
			//Loop through the array send the info forward to the next function.
			fetch('http://localhost:3000/articles') 
			.then((response) => {
				return response.json();
			})
			.then(function(savedNews) { 
				 // Puts the fetch response into the parameter "savedNews". 
				 //Loop through the array of information and send it to the function that show it on the DOM. 
				 mostInteresting.innerHTML = ""; 
				 for (var i = 0; i < savedNews.length; i++) {
				 	newsMod.showSavedArticlesOnHtml(savedNews[i]);
				 };
				 newsMod.showNhideMagic();
				})
			.catch(function(error) {
				console.log('Request failed', error); 
			});		
		},
		showSavedArticlesOnHtml: (savedArticle) => {
			//Print out the saved articles with the information sent from getArticlesFromDatabase.
			let savedNewsDiv = `
			<div class="col-lg-3 col-md-6 col-sm-12">
			<div class="showNews card">
			<h4>Saved in the database!</h4>
			<img class="card-img-top img-responsive pt-15" src="${savedArticle.urlToImage}">
			<div class="card-block">
			<h5 class="card-title">Headline: ${savedArticle.title}</h5>
			<h5 class="card-title">Author: ${savedArticle.author}</h5>
			<p class="card-text">Description: ${savedArticle.description}</p>
			<p class="card-text">Date published: ${savedArticle.publishedAt}</p>
			<a class="card-text" href="${savedArticle.url}" target="_blank">${savedArticle.url}</a>
			<br>
			<button id="btnDelete" class="btnDelete btn btn-danger" value="Delete News" data-articleid='${savedArticle.id}'>Delete News</button>
			</div>
			</div>
			</div>`;
			mostInteresting.innerHTML += savedNewsDiv;
             //Delete Button click saves a saved articles ID in a data-object.
             //The button becomes an array with the ID from the chosen article.
             //On click deleteArticlesFromHTML is invoked with "this.dataset.articleid" = the saved ID from the article object.
             //deleteArticlesFromHTML in turn invoke a fetch DELETE method that has the chosen articles ID put into the fetch URL.
             //The article is deleted from the database and the HTML is updated.
             let delButtons = document.getElementsByClassName("btnDelete");
             for (var i = 0; i < delButtons.length; i++) {
             	delButtons[i].addEventListener("click", function() {
             		$('#mostInteresting, #newsOutput').removeClass('visible');
             		$('#loading').show();
             		newsMod.deleteArticlesFromHTML(this.dataset.articleid);
             		console.log(this.dataset.articleid);
             	});
             }
			//Invoke loading gif
			newsMod.showNhideMagic();
		},
		deleteArticlesFromHTML: (articleId) => {
			
			fetch(`http://localhost:3000/articles/${articleId}`, {
				method: 'DELETE', 
				mode: 'cors', 
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'text/plain'
				})
			}).then(function(data) {
				console.log("Article DELETED");
				newsMod.getArticlesFromDatabase();
				newsMod.showNhideMagic();
			})
			.catch(function(error) {
				console.log(error);
			})        
		},
		showNhideMagic()  {
			//Function that controls the loading gif and how the navbar collapse in mobile/ipad view.
			//setTimeout for 2 seconds then gif fades out and the divs with the news are shown.
			$(document).ready(function() {
				//http://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click
				$(".navbar-nav li a").click(function(event) {
					if (!$(this).parent().hasClass('dropdown'))
						$(".navbar-collapse").collapse('hide');
				});
				setTimeout(function(){ 
					$('#loading').fadeOut(250, function() {
						$('#newsOutput, #mostInteresting').addClass('visible');
					});
				}, 2000);
			});
		},
		//Function to gather the EventListeners
		registerEventHandlers: () => {
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
document.getElementById("espn").addEventListener("click", newsMod.findArticleById);
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

},
		  //Self-invoking function that will load the DOM content, first page, loading indicator, show if there are any saved articles in the DB and activate all the EventListeners.
		  initialize: (() => {
		  	document.addEventListener('DOMContentLoaded', () => {
		  		newsMod.getLatestNews();
		  		newsMod.showNhideMagic();
		  		newsMod.registerEventHandlers();
		  		newsMod.getArticlesFromDatabase();	

		  	});
		  })()
		}
	})();


