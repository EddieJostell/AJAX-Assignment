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

    getTopBBCNews: () => {
     const urlBBC = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

     fetch(urlBBC)
			.then((resp) => resp.json()) // Transform the data into json
			.then(function(data) {
				console.log(data);
                  // Create and append the li's to the ul
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
                    </div>`;
                    newsOutput.innerHTML += newsDiv;
                  };          
                })
      .catch(function(error) {
        console.log(error);
      });		
    },
    getTopCNNNews: () => {
     const urlCnn = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

     fetch(urlCnn)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
                  // Create and append the li's to the ul
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
                    </div>`;
                    newsOutput.innerHTML += newsDiv;
                  };          
                })
      .catch(function(error) {
        console.log(error);
      });   
    },
    getGeneralNews: () => {
      const urlCnn = "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ba003866cd1849ffb405924244eb308e";

     fetch(urlCnn)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
                  // Create and append the li's to the ul
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
                    </div>`;
                    newsOutput.innerHTML += newsDiv;
                  };          
                })
      .catch(function(error) {
        console.log(error);
      });   
    }

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
    getTechNews: () => {
      const techUrl = "https://newsapi.org/v1/sources?category=technology&apiKey=ba003866cd1849ffb405924244eb308e";
      
      fetch(techUrl)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let tech = data.sources;

        for (var i = 0; i < tech.length; i++) {
          let techDiv = `
          <div class="showNews">
          <img height="400" width="695" src="${tech[i].urlToLogos}">
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

    getMusicNews: () => {
      const musicUrl = "https://newsapi.org/v1/sources?category=music&apiKey=ba003866cd1849ffb405924244eb308e";
      
      fetch(musicUrl)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let music = data.sources;

        for (var i = 0; i < music.length; i++) {
          let musicDiv = `
          <div class="showNews">
          <img height="400" width="695" src="${music[i].urlToLogos}">
          <h5>Source: ${music[i].name}</h5>
          <h5>Category: ${music[i].category}</h5>
          <p>Description: ${music[i].description}</p>
          <p>Language: ${music[i].language}</p>
          <p>Country: ${music[i].country}</p>
          <a href="${music[i].url}">${music[i].url}</a>
          </div>`;
          newsOutput.innerHTML += musicDiv;
        };
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    getGamingNews: () => {
      const gameUrl = "https://newsapi.org/v1/sources?category=gaming&apiKey=ba003866cd1849ffb405924244eb308e";
      
      fetch(gameUrl)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        console.log(data);
        newsOutput.innerHTML = "";
        let game = data.sources;

        for (var i = 0; i < game.length; i++) {
          let gameDiv = `
          <div class="showNews">
          <img class="img-responsive pt-15" src="${game[i].urlToLogos}">
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
document.getElementById("techNews").addEventListener("click", newsMod.getRedditNews);
document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);
document.getElementById("sportsNews").addEventListener("click", newsMod.getSportsNews);
document.getElementById("sourceOfNews").addEventListener("click", newsMod.sourceOfNews);
document.getElementById("techNews").addEventListener("click", newsMod.getTechNews);
document.getElementById("musicNews").addEventListener("click", newsMod.getMusicNews);
document.getElementById("cnnNews").addEventListener("click", newsMod.getTopCNNNews);
document.getElementById("bbcNews").addEventListener("click", newsMod.getTopBBCNews);
document.getElementById("gameNews").addEventListener("click", newsMod.getGamingNews);

