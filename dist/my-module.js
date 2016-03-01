/**
 * Angular module seed
 * @author hmartos
 */
(function() {
	//Module definition with dependencies
	angular.module('my.module', []);
})();
angular.module("my.module").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<div>\r\n	<h1 class=\"my-class\">Welcome!</h1>\r\n</div>");}]);