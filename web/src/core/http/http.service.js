import angular from 'angular';
import logger from '../../utils/logger';

class HttpService {
    constructor($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }

    request(method, url, options) {
        const deferred = this.$q.defer();
        const httpContext = angular.extend({
            method,
            url,
        }, options);

        logger.log('request:', method, url);

        this.$http(httpContext)
            .then((result) => {
                logger.log(method, url, result);
                deferred.resolve(result);
            })
            .catch((error) => {
                logger.error(method, url, error);
                deferred.reject(error);
            });

        return deferred.promise;
    }

    get(url, options) {
        return this.request('GET', url, options);
    }

    post(url, options) {
        return this.request('POST', url, options);
    }

    put(url, options) {
        return this.request('PUT', url, options);
    }
}

HttpService.$inject = [
    '$q',
    '$http',
];

export default HttpService;
