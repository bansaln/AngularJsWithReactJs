(function() {
  'use strict';

  angular
    .module('reactJsRnd')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('simpleReact', {
        url: '/simpleReact',
        templateUrl: 'app/simpleReact/simpleReact.html',
        controller: 'SimpleReactController',
        controllerAs: 'simpleReact'
      })
      .state('withRedux', {
        url: '/withRedux',
        templateUrl: 'app/withRedux/withRedux.html',
        controller: 'WithReduxController',
        controllerAs: 'withRedux'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
