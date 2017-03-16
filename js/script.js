console.log("AJAX-ASSIGNMENT");

const newsMod = (() => {

	return {
    NewsConstructor: function(title, author, date, description, cover, source) {
      this.title = title;
      this.author = author;
      this.date = date;
      this.description = description;
      this.cover = cover || 'http://placehold.it/600x900?text=' + title;
      this.source = source;
    },

    createNewsFromHTML: () =>  {
     let addTitle = document.getElementById("title").value.trim();
     let addAuthor = document.getElementById("author").value;
     let addCover = document.getElementById("cover").value;
     let addDescription = document.getElementById("description").value;
     let addDate = document.getElementById("date").value;
     let addSource = document.getElementById("source").value;
   },

   getLatestNews: () => {
     const url = "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ba003866cd1849ffb405924244eb308e";


     fetch(url)
			.then((resp) => resp.json()) // Transform the data into json
  /*    .then(function(data) {


  })*/
  .then(function(data) {
    console.log(data);
    newsOutput.innerHTML = "";
    let news = data.articles;
    
    for (var i = 0; i < news.length; i++) {
      let newsDiv = `
      <div class="showNews">
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
  /*    .then(function(data) {


  })*/
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
  /*    .then(function(data) {


  })*/
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

  datepicker: () => {
           var date_input = $('input[name="date"]'); //our date input has the name "date"
           var container = $('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
           date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
          })
         }
       }

     })();

     newsMod.getLatestNews();
     newsMod.datepicker();
     document.getElementById("redditNews").addEventListener("click", newsMod.getRedditNews);
     document.getElementById("latestNews").addEventListener("click", newsMod.getLatestNews);
     document.getElementById("sportsNews").addEventListener("click", newsMod.getSportsNews);
     document.getElementById("sourceOfNews").addEventListener("click", newsMod.sourceOfNews);