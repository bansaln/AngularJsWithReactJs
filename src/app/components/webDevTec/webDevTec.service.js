(function() {
  'use strict';

  angular
      .module('reactJsRnd')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'ReactJS',
        'url': 'https://facebook.github.io/react/',
        'description': 'A Javascript library for building User Interfaces',
        'logo': 'react.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
