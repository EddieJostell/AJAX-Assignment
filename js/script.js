console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {




	return {
		getLatestNews: () => {
			const ul = document.getElementById("news");
			const url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";

			/*function createNode(element) {
              	return document.createElement(element); // Create the type of element you pass in the parameters
              }

              function append(parent, el) {
              	return parent.appendChild(el); // Append the second parameter(element) to the first one
              }*/


              fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
        newsOutput.innerHTML = "";
        let news = data.articles;
        for (var i = 0; i < news.length; i++) {
          let newsDiv = `
          <div class="showNews">
          <img height="400" width="auto" src="${news[i].urlToImage}">
          <h3>${news[i].author}</h3>
          <p>${news[i].description}</p>
          <p>${news[i].publishedAt}</p>
          <p>${news[i].title}</p>
          <a href="${news[i].url}">${news[i].url}</a>
          </div>`;
          newsOutput.innerHTML += newsDiv;
        };
                  // Create and append the li's to the ul
                 /* let news = data.articles;
                  return news.map(function(news) {
                  	let li = createNode("li"),
                  	img = createNode("img"),
                  	span = createNode("span");
                  	img.src = news.urlToImage; 
                  	newsOutput.innerHTML = `
                  	<div class="showNews">
                    <h3>${news.author}</h3>
                    <p>${news.description}</p>
                    <p>${news.publishedAt}</p>
                    <p>${news.title}</p>
                    <a href="${news.url}">${news.url}</a>
                    <img height="300" width="300" src="${news.urlToImage}">
                    </div>`;
                  	append(li, img);
                  	append(li, span);
                  	append(ul, li);
                  })*/
                })
			.catch(function(error) {
				console.log(error);
			});
		},
		getTopNews: () => {
			const ul = document.getElementById("news");
			const url = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

			


      fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
                  let news = data.articles;
                  newsOutput.innerHTML = "";
                  for (var i = 0; i < news.length; i++) {
                    let newsDiv = `
                    <div class="showNews">
                    <img height="400" width="auto" src="${news[i].urlToImage}">
                    <h3>${news[i].author}</h3>
                    <p>${news[i].description}</p>
                    <p>${news[i].publishedAt}</p>
                    <p>${news[i].title}</p>
                    <a href="${news[i].url}">${news[i].url}</a>
                    </div>`;
                    newsOutput.innerHTML += newsDiv;
                  };
             /*     return news.map(function(news) {
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
                  	</div>`;*/            
    })
.catch(function(error) {
  console.log(error);
});		
}
}

})();

newsMod.getLatestNews();
document.getElementById("btnTop").addEventListener("click", newsMod.getTopNews);