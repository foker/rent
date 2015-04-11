/**
 * Created by macbook on 11.04.15.
 */

angular.module('directives', []);
angular.module('services', []);

angular.module('rent.main', [
    'directives',
    'services',
    'restangular',
    'ui.bootstrap'
]);

angular.module('rent', [
    'rent.main',
    'ui.router'
]);