Slickr
======

Slickr is a slicker and more simple flickr api from the ones I've seen in my admitedly short search
for one. It's implemented as a jquery plugin, and based on
[jquery-flickr](https://github.com/rpheath/jquery-flickr) by Ryan Heath. Unlike that plugin though,
it doesn't return jquery after an api call. After trying to use jquery-flickr, I realized that
approach doesn't make any sense if you'd like to do something with the images you're fetching. They
are fetched with an http call, which probably won't return by the time control is passed to the next
call in the chain. Waiting for the http call to finish before handing off control is obviously
unacceptable, so slickr just accepts a callback that is given jquery as an argument.

Usage
=====

    .slickr( method , options , [ callback ] );

Slickr trys to put as little as possible between you and the
[flickr api](http://www.flickr.com/services/api/). It assumes the flickr method you're calling
returns a set of photos and adds whatever it receives to the elements selected by jquery. They're
added as children in a set of anchors containing images. It takes three arguments:

* `method` the name of the method you'd like to call (a string), which corresponds directly to
  method names in the flickr api list.
* `options` an object containing options for using slickr and the arguments for the method.
* `callback` an optional callback function that's called after the fetched images have been added to
  the selected elements. It's given one argument, the selected elements.

As well as the required and optional arguments for a given method, you can specify two options for
slickr itself. `display_size` specifies the size of the images that are added to the selected
elements. It corresponds to flickr's usual size options and can be one of `sq` for square, `t` for
thumbnail, `s` for small, `m` for medium. The default is medium. `link_to_size` specifies the size
of the image that the images that are added to the selected elements link to. It can be one of the
same values that I described for `display_size`. If `link_to_size` isn't specified, then the images
will link to the main page for each image.
