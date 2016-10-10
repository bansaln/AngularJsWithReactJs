(function() {
    'use strict';

    angular
        .module('reactJsRnd')
        .controller('SimpleReactController', SimpleReactController);

        function SimpleReactController() {
            var vm = this;
            vm.person = { fname: 'Nitin', lname: 'Bansal' };
        }

})();


    var Hello = React.createClass({
        propTypes: {
            fname: React.PropTypes.string.isRequired,
            lname: React.PropTypes.string.isRequired
        },
        render: function() {
            return React.DOM.span( null,
            'Entered Name: ' + this.props.fname + ' ' + this.props.lname
            );
        }
    });

(function() {
    'use strict';

    angular
        .module('reactJsRnd')
        .directive('hello', function(reactDirective) {
            return reactDirective(Hello);
        });
})();

(function() {
    'use strict';

    angular
        .module('reactJsRnd')
        .value('Hello', Hello);
})();