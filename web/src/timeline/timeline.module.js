import angular from 'angular';
import HttpModule from '../core/http/http.module';
import StorageModule from '../core/storage/storage.module';
import CalendarModule from '../shared/calendar/calendar.module';
import TimelineComponent from './timeline.component';
import timelineRoutingConfig from './timeline-routing.config';

const TimelineModule = angular
    .module('app.timeline', [
        HttpModule,
        StorageModule,
        CalendarModule,
    ])
    .component('appTimeline', TimelineComponent)
    .config(timelineRoutingConfig)
    .name;

export default TimelineModule;
