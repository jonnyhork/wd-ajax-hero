(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  // GET USER INPUT FROM SEARCH //

  // $('#btn-search').click((event) => event.preventDefault())

  $('#btn-search').click(function(event) {
    event.preventDefault()
    movies.splice(0, movies.length)
    let userInput

    if ($('#search').val() !== '') {
      userInput = $('#search').val()
      // console.log(userInput);
    }

    // CLEAR THE SEARCH
    $('#search').val('')

    // replace any spaces with %20 //
    let endPoint = userInput.replace(/\s/g, '%20')
    // console.log(endPoint);

    //  MAKE THE AJAX CALL //

    var $xhr = $.getJSON(`https://omdb-api.now.sh/?s=${endPoint}`);

    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }
      // console.log('DATA is: ', data);
      let searchResult = data['Search']
      // console.log("SEARCHRESULT is: ", searchResult);
      searchResult.forEach((obj) => {

        // movies = searchResult.map((obj) => {
        //   return {
        //     id: obj.imdbID,
        //     poster: obj.Poster,
        //     title: obj.Title,
        //     year: obj.Year,
        //   }
        //
        // }) // end of the map()

        movies.push({
          id: obj.imdbID,
          poster: obj.Poster,
          title: obj.Title,
          year: obj.Year,
        })

      }) // forEACH

      // console.log('movies Array: ', movies);
      renderMovies()

    }); // AJAX REQUEST

    // $('.modal-trigger').click((event) => {
    //   let movieID = $(this).attr('href')
    //   console.log('movieID is: ', movieID);
    // var $xhr = $.getJASON(`http://www.omdbapi.com/?i=${movieID}`)
    // })
  }) // END OF CLICK EVENT FOR SEARCH






})();
