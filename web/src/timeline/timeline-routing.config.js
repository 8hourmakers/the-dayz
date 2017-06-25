function timelineRoutingConfig($stateProvider) {
    $stateProvider.state('timeline', {
        url: '/timeline',
        template: '<app-timeline></app-timeline>',
    });
}

timelineRoutingConfig.$inject = [
    '$stateProvider',
];

export default timelineRoutingConfig;
