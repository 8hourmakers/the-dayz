import angular from 'angular';
import CalendarDirective from './calendar.directive';

const CalendarModule = angular
    .module('app.shared.calendar', [])
    .directive('appCalendar', CalendarDirective)
    .name;

export default CalendarModule;
