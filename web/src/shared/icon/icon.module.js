import angular from 'angular';
import IconComponent from './icon.component';

const IconModule = angular
    .module('app.shared.icon', [])
    .component('appIcon', IconComponent)
    .name;

export default IconModule;
