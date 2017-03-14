console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {




	return {
		getLatestNews: () => {
			const ul = document.getElementById("news");
			const url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			function createNode(element) {
              	return document.createElement(element); // Create the type of element you pass in the parameters
              }

              function append(parent, el) {
              	return parent.appendChild(el); // Append the second parameter(element) to the first one
              }


              fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
                  let news = data.articles;
                  return news.map(function(news) {
                  	let li = createNode("li"),
                  	img = createNode("img"),
                  	span = createNode("span");
                  	img.src = news.urlToImage;
                  	span.innerHTML = `
                  	<div>
                  	<h3>${news.author}</h3>
                  	<p>${news.title}</p>
                  	<a href="${news.url}">${news.url}</a>
                  	</div>`;
                  	append(li, img);
                  	append(li, span);
                  	append(ul, li);
                  })
              })
			.catch(function(error) {
				console.log(error);
			});
		},
		getTopNews: () => {
			const ul = document.getElementById("news");
			const url = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

			function createNode(element) {
              	return document.createElement(element); // Create the type of element you pass in the parameters
              }

              function append(parent, el) {
              	return parent.appendChild(el); // Append the second parameter(element) to the first one
              }


              fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
                  let news = data.articles;
                  return news.map(function(news) {
                  	let li = createNode("li"),
                  	img = createNode("img"),
                  	span = createNode("span");
                  	img.src = news.urlToImage;
                  	span.innerHTML = "";
                  	span.innerHTML = `
                  	<div>
                  	<h3>${news.author}</h3>
                  	<p>${news.title}</p>
                  	<a href="${news.url}">${news.url}</a>
                  	</div>`;
                  	append(li, img);
                  	append(li, span);
                  	append(ul, li);
                  })
              })
			.catch(function(error) {
				console.log(error);
			});		
		}
	}

})();

newsMod.getLatestNews();
document.getElementById("btnTop").addEventListener("click", newsMod.getTopNews);