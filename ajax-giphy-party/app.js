const $gifArea = $('#gif-area');
    const $searchInput = $('#search');

    function addGif(res) {
      let numResults = res.data.length;
      if (numResults) {
        let randomIndex = Math.floor(Math.random() * numResults);
        let $newCol = $('<div>', { class: 'col-md-4 col-12 mb-4' });
        let $newGif = $('<img>', {
          src: res.data[randomIndex].images.original.url,
          class: 'w-100'
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
      }
    }

    function addGifButtonClick() {
      axios
        .get('https://api.giphy.com/v1/gifs/random', {
          params: {
            api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
          }
        })
        .then(function(response) {
          addGif(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    $('#add').on('click', addGifButtonClick);

    $('form').on('submit', async function(evt) {
      evt.preventDefault();

      let searchTerm = $searchInput.val();
      $searchInput.val('');

      const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          q: searchTerm,
          api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
        }
      });
      addGif(response.data);
    });

    $('#remove').on('click', function() {
      $gifArea.empty();
    });