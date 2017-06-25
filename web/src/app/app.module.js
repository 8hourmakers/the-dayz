import angular from 'angular';
import UIRouter from 'angular-ui-router';
import EventDetailModule from '../event-detail/event-detail.module';
import HomeModule from '../home/home.module';
import TimelineModule from '../timeline/timeline.module';
import AppComponent from './app.component';
import appRoutingConfig from './app-routing.config';

const AppModule = angular
    .module('app', [
        UIRouter,
        EventDetailModule,
        HomeModule,
        TimelineModule,
    ])
    .component('appRoot', AppComponent)
    .config(appRoutingConfig)
    .name;

export default AppModule;
