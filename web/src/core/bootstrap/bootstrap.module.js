import angular from 'angular';
import BootstrapCtrl from './bootstrap.controller';

const BootstrapModule = angular
    .module('app.core.bootstrap', [])
    .controller('bootstrapCtrl', BootstrapCtrl)
    .name;

export default BootstrapModule;
