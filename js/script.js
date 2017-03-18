console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {

	return {
   getLatestNews: () => {
     const url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";


     fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let news = data.articles;

        for (var i = 0; i < news.length; i++) {
          let newsDiv = `
          <div class="showNews col-md-4">
          <img class="img-responsive pt-15" src="${news[i].urlToImage}">
          <h5>Headline: ${news[i].title}</h5>
          <h5>Author: ${news[i].author}</h5>
          <p>Description: ${news[i].description}</p>
          <p>Date: ${news[i].publishedAt}</p>
          <a href="${news[i].url}">${news[i].url}</a>
          </div>`;
          newsOutput.innerHTML += newsDiv;
        };
      })
      .catch(function(error) {
        console.log(error);
      });
    },

    getRedditNews: () => {
     const url = " https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

     fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
                  let news = data.articles;
                  newsOutput.innerHTML = "";
                  for (var i = 0; i < news.length; i++) {
                    let newsDiv = `
                    <div class="showNews col-md-12 col-sm-12 col-xs-12">
                    <img height="400" width="695" src="${news[i].urlToImage}">
                    <h5>Headline: ${news[i].title}</h5>
                    <h5>Author: ${news[i].author}</h5>
                    <p>Description: ${news[i].description}</p>
                    <p>Date: ${news[i].publishedAt}</p>
                    <a href="${news[i].url}">${news[i].url}</a>
                    </div>`;
                    newsOutput.innerHTML += newsDiv;
                  };          
                })
      .catch(function(error) {
        console.log(error);
      });		
    },

    getSportsNews: () => {
      const url = "https://newsapi.org/v1/sources?category=sport&apiKey=ba003866cd1849ffb405924244eb308e";
      
      fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let source = data.sources;

        for (var i = 0; i < source.length; i++) {
          let sourceDiv = `
          <div class="showNews">
          <img height="400" width="695" src="${source[i].urlToLogos}">
          <h5>Source: ${source[i].name}</h5>
          <h5>Category: ${source[i].category}</h5>
          <p>Description: ${source[i].description}</p>
          <p>Language: ${source[i].language}</p>
          <a href="${source[i].url}">${source[i].url}</a>
          </div>`;
          newsOutput.innerHTML += sourceDiv;
        };
      })
      .catch(function(error) {
        console.log(error);
      });
    },

    sourceOfNews: () => {
     const url = "https://newsapi.org/v1/sources?&apiKey=ba003866cd1849ffb405924244eb308e";
     fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let source = data.sources;

        for (var i = 0; i < source.length; i++) {
          let sourceDiv = `
          <div class="showNews">
          <img height="400" width="695" src="${source[i].urlToLogos}">
          <h5>Source: ${source[i].name}</h5>
          <h5>Category: ${source[i].category}</h5>
          <p>Description: ${source[i].description}</p>
          <p>Language: ${source[i].language}</p>
          <p>Country: ${source[i].country}</p>
          <a href="${source[i].url}">${source[i].url}</a>
          </div>`;
          newsOutput.innerHTML += sourceDiv;
        };
      })
    },


  }

})();

newsMod.getLatestNews();
document.getElementById("techNews").addEventListener("click", newsMod.getRedditNews);
document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);
document.getElementById("sportsNews").addEventListener("click", newsMod.getSportsNews);
document.getElementById("sourceOfNews").addEventListener("click", newsMod.sourceOfNews);