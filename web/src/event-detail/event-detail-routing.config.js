function eventDetailRoutingConfig($stateProvider) {
    $stateProvider.state('eventDetail', {
        url: '/event-detail/:id',
        template: '<app-event-detail></app-event-detail>',
    });
}

eventDetailRoutingConfig.$inject = [
    '$stateProvider',
];

export default eventDetailRoutingConfig;
