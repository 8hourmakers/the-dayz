import angular from 'angular';
import HttpService from './http.service';
import HttpConstants from './http.const';
import httpProviderConfig from './http-provider.config';

const HttpModule = angular
    .module('app.core.http', [])
    .service('httpService', HttpService)
    .constant('httpConstants', HttpConstants)
    .config(httpProviderConfig)
    .name;

export default HttpModule;
