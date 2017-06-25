import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HttpModule from '../core/http/http.module';
import StorageModule from '../core/storage/storage.module';
import EventDetailComponent from './event-detail.component';
import eventDetailRoutingConfig from './event-detail-routing.config';

const EventDetailModule = angular
    .module('app.eventDetail', [
        UIRouter,
        HttpModule,
        StorageModule,
    ])
    .component('appEventDetail', EventDetailComponent)
    .config(eventDetailRoutingConfig)
    .name;

export default EventDetailModule;
