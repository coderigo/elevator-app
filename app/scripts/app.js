'use strict';

/**
 * @ngdoc overview
 * @name elevatorAppApp
 * @description
 * # elevatorAppApp
 *
 * Main module of the application.
 */
angular
  .module('elevatorAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
