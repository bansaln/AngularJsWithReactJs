(function() {
  'use strict';

  angular
    .module('reactJsRnd')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
