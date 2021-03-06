/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  var loader = document.querySelector('#splash');

  var loaderAnimation = new Vivus('loader', {
    duration: 100,
    type: 'oneByOne',
    animTimingFunction: Vivus.EASE
  }, callback);

  var direction = 1;
  function callback() {
    direction = direction > 0 ? -1 : 1;
    loaderAnimation.play(direction);
  }

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    app.document = document.body;
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });


  app.goToPreviousPage = function() {
    app.$.page.selectPrevious();
  };

  app.goToNextPage = function() {
    app.$.page.selectNext();
  };

  app.goToPage = function() {
    page('/' + app.route);
  };

  app.removeLoading = function() {
    loader.classList.add('fade-out');
    loader.addEventListener('transitionend', this.hideLoader);
  };

  app.hideLoader = function(e) {
    loader.removeEventListener('transitionend', this.hideLoader);
    loader.hidden = true;
    loaderAnimation.stop();
  };

  app.arrowHandler = function(e) {
    if (e.detail.keyboardEvent.keyIdentifier === 'Left') {
      this.goToPreviousPage();
    } else {
      this.goToNextPage();
    }
  };

  app.onDataFetched = function(e) {
    e.detail.val() && this.removeLoading();
  };

})(document);
