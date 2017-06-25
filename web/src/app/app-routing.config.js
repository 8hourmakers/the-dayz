function appRoutingConfig($stateProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: '<app-home></app-home>',
        });

    $locationProvider.html5Mode(true);
}

appRoutingConfig.$inject = [
    '$stateProvider',
    '$locationProvider',
];

export default appRoutingConfig;
