
(function () {
    //define main module
 angular.module('FD360', [
 'ngRoute', 'ngAnimate', 'ngMessages', 'Filter360', 'Directive360', 'angularCharts', 'ui.bootstrap'
]);


    //app config
 angular.module('FD360').config(['$routeProvider', '$locationProvider', config360]);

 
 function config360($routeProvider, $locationProvider) {
  
    $routeProvider.
      when('/EmployeeDashboard', {
          templateUrl: 'app/templates/employee_dashboard.html',
          controller: 'EmployeeController'
      }).
      when('/CoursesAdmin', {
        templateUrl: 'app/templates/courses_admin.html',
        controller: 'CoursesAdminController',
          controllerAs: 'vm'
     }).
      when('/KPI', {
        templateUrl: 'app/templates/kpi.html',
        controller: 'KPIController'
      }).
      when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
       }).
      when('/Home', {
                   templateUrl: 'app/templates/home.html',
                   controller: 'HomeController',
                   controllerAs: 'vm'
               }).
      otherwise({
          redirectTo: '/'
      });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}

 angular.module('FD360').config(function ($httpProvider) {

     $httpProvider.interceptors.push(function ($q, $rootScope) {
         return {
             'request': function (config) {
                 $rootScope.$broadcast('loading-started');
                 return config || $q.when(config);
             },
             'response': function (response) {
                 $rootScope.$broadcast('loading-complete');
                 return response || $q.when(response);
             }
         };
     });

 });


})();





