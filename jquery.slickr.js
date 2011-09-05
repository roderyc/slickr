(function($) {
  var internal_options = ["display_size", "link_to_size"]
  // Returns an object with only parameters meant for the flickr api, removing the ones we use
  // internally.
  function paramObject(options) {
    var new_opts = {};
    $.each(options, function(key, value) {
      new_opts[key] = value;
    });
    return new_opts;
  }

  // Constructs a url for a call to the flickr api.
  function url(method, options) {
    return ('https://secure.flickr.com/services/rest/?method=' + method + '&format=json&' +
            $.param(paramObject(options)) + '&jsoncallback=?');
  };

  // Translates plugin image sizes to flickr sizes.
  function translateSize(size) {
    switch(size) {
    case 'sq': return '_s'; // square
    case 't' : return '_t'; // thumbnail
    case 's' : return '_m'; // small
    case 'm' : return '';   // medium
    default  : return '';   // medium
    }
  };

  // Returns a url to the photo at the size specified by size. size must be one of the strings
  // specified in the translation table above.
  function src(photo, size) {
    return ('http://farm' + photo.farm + '.static.flickr.com/' + photo.server +
            '/' + photo.id + '_' + photo.secret + translateSize(size) + '.jpg');
  };

  // Returns a url for the given photo. If link_to_size is given, the url is the location of the
  // specified size of that photo, otherwise it's the photo's main page.
  function link(photo, link_to_size) {
    if (link_to_size !== undefined && link_to_size.match(/sq|t|s|m|o/)) {
      return src(photo, link_to_size);
    } else {
      return ['http://www.flickr.com/photos', photo.owner, photo.id].join('/');
    }
  };

  // Returns an anchor to the given photo that contains the html specified by children.
  function anchor(children, photo, link_to_size) {
    return ('<a href="' + link(photo, link_to_size) + '" title="' + photo.title + '">' +
            children + '</a>');
  };

  // Returns an image tag for the given photo, at the given size.
  function image(photo, size) {
    return '<img src="' + src(photo, size) + '" alt="' + photo.title + '" />';
  };

  // Returns a set of anchors containing image tags for the given photos, (one image per anchor),
  // using the given options.
  function anchors(photos, options) {
    return $($.map(photos.photo, function(photo) {
      return anchor(image(photo, options.display_size), photo, options.link_to_size);
    }).join("\n"));
  };

  $.fn.slickr = function(method, user_options, callback) {
    var options = $.extend({
      display_size: "m"
    }, user_options || {});

    var elements = this;

    $.getJSON(url(method, options), function(data) {
      var images = anchors((data.photos === undefined ? data.photoset : data.photos), options);

      elements.each(function(index, element) {
        $(element).append(images);
      });

      if(callback !== undefined) {
        callback(elements);
      }
    });
  };
})(jQuery);
