
(function() {
    'use strict';

		// I provide the single Redux store for the entire application.
		angular.module( "reactJsRnd" ).factory(
			"store",
			function storeFactory( Redux, $log ) {

				// Create the store enhancer that will apply the logging middleware.
				// --
				// NOTE: If I were going to use middleware in an actual app, I think 
				// that I would author the store as a "provider" and then make the 
				// middleware configurable during the config phase (much like HTTP 
				// interceptors can be defined during the config phase). This way, 
				// the store factory would only be concerned with creating the store 
				// and not with defining the logic of the middleware (maybe a good 
				// follow-up post, eh?).
				var storeEnhancer = Redux.applyMiddleware( loggingMiddlewareFactory );

				// Create the enhanced createStore() method. The resulting function
				// acts like the .createStore() method, but creates a store with the
				// desired middleware applied.
				var enhancedCreateStore = storeEnhancer( Redux.createStore );

				// Create the enhanced Redux store.
				var store = enhancedCreateStore(
					function rootReducer( state, action ) {

						// If the state is undefined, return the default structure. When
						// Redux is initializing the store, it dispatches an INIT event
						// with an undefined state.
						if ( ! state ) {

							return {
								counter: 0
							};

						}

						switch ( action.type ) {
							case "INCREMENT":
								state.counter += action.payload.delta;
							break;
						}

						return state;
						
					}
				);

				return store;


				// ---
				// PRIVATE METHODS.
				// ---


				// I provide logging middleware for the given store.
				// --
				// NOTE: This is only ever called once per store.
				function loggingMiddlewareFactory( store ) {

					return dispatchFactory;


					// I generate the dispatch interceptor for the middleware.
					// --
					// NOTE: This is only ever called once per store.
					function dispatchFactory( nextDispatch ) {

						return dispatch;


						// I log the given action before passing the action onto the next
						// dispatcher in the middleware chain.
						// --
						// NOTE: This is called once per dispatch life-cycle.
						// --
						// CAUTION: The nextDispatch() method does not necessarily have 
						// to be called in a synchronous manner, per say, depending on 
						// how comfortable you are with Redux shifting from a synchronous 
						// to an asynchronous workflow (personally, I prefer synchronous).
						function dispatch( action ) {

							$log.info( "Logging from middleware:", action );

							return nextDispatch(action);

						}

					}

				}

			}
		);
})();


	(function() {
    'use strict';


		// I decorate the Redux store, adding logging for the dispatch requests.
		angular.module( "reactJsRnd" )
        .decorator("store",
			function storeDecoratorForLogging( $delegate, $log ) {

				// Get a reference to the core dispatch() method since we are about to
				// overwrite it with our logging proxy.
				var coreDispatch = $delegate.dispatch;

				// Overwrite the core dispatch method with our proxy that will 
				// log-out the current action before dispatching the action to the
				// core dispatch method.
				$delegate.dispatch = function dispatchProxy( action ) {

					$log.info( "Logging from decorator:", action );

					return coreDispatch.apply($delegate, arguments);

				};

				// Return the decorated store.
				return $delegate;

			}
		);

    })();
		
    (function() {
    'use strict';

		// I control the root of the application.
		angular.module("reactJsRnd")
        .controller("WithReduxController", WithReduxController);

			function WithReduxController( $scope, $log, store ) {

				var vm = this;

				// Subscribe to the store so we can re-render when the store is updated.
				store.subscribe( renderState );

				// Apply the current state to the view-model.
				renderState();

				// Expose public methods.
				vm.increment = increment;


				// ---
				// PUBLIC METHODS.
				// ---


				// I increment the counter.
				function increment() {

					var action = store.dispatch({
						type: "INCREMENT",
						payload: {
							delta: 1
						}
					});

					$log.info( "Done dispatching:", action );
					$log.log( "- - - - - - - - - - - - - " );

				}


				// ---
				// PRIVATE METHODS.
				// ---


				// I apply the current state to the local view-model.
				function renderState() {

					vm.counter = store.getState().counter;

				}

			}
    })();

(function() {
    'use strict';

		// I expose Redux as an injectable.
		angular.module( "reactJsRnd" )
        .factory("Redux",
			function ReduxFactory( $window ) {

				var Redux = $window.Redux;

				// Remove from the global scope to prevent reference leakage.
				delete( $window.Redux );

				return Redux;

			}
		);
})();