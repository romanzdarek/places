import * as Angular from 'angular';
declare const angular: Angular.IAngularStatic;
const app = angular.module('locationsApp', [ 'core', 'ngRoute' ]);
const root = 'http://127.0.0.1:8000/';

app.config([
	'$routeProvider',
	($routeProvider: any) => {
		$routeProvider
			.when('/all', { controller: 'MainController', templateUrl: '/views/main.html', reloadOnSearch: false })
			.when('/location/:id', { controller: 'LocationController', templateUrl: '/views/location.html' })
			.when('/add', { controller: 'AddController', templateUrl: '/views/add.html' })
			.when('/update/:id', { controller: 'UpdateController', templateUrl: '/views/update.html' })
			.otherwise({ redirectTo: '/all' });
	}
]);

app.directive('fileModel', [
	'$parse',
	($parse: any) => {
		return {
			restrict: 'A',
			link: (scope: any, element: any, attrs: any) => {
				const model = $parse(attrs.fileModel);
				const modelSetter = model.assign;
				element.bind('change', () => {
					scope.$apply(() => {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}
]);


app.component('navigation', {
	templateUrl: '/views/navigation.html',
	controller: [
		'$location',
		function NavigationController($location: any) {
			this.getClass = function(path: string) {
				return $location.path().substr(0, path.length) === path ? 'active' : '';
			};
		}
	]
});

/*
app.controller('NavigationController', [
	'$scope',
	'$location',
	($scope: any, $location: any) => {
		$scope.getClass = function(path: string) {
			return $location.path().substr(0, path.length) === path ? 'active' : '';
		};
	}
]);
*/

app.controller('MainController', [
	'$scope',
	'$http',
	'$location',
	($scope: any, $http: Angular.IHttpService, $location: any) => {
		console.log('Zapínam MainController');
		(<any>$scope).root = root;
		$scope.myFilter = { title: $location.search().filtr };
		$scope.sortBy = 'id';
		$scope.reverse = true;

		$scope.changeUrl = (filtr: string) => {
			$location.search('filtr', filtr);
		};

		$scope.sort = (by: any) => {
			$scope.sortBy = by;
			$scope.reverse = !$scope.reverse;
		};

		$http.get(root + 'api/locations').then((locations: any) => {
			console.log('Načítám lokace');
			$scope.locations = locations.data;
			const date = new Date($scope.locations.date);
			$scope.locations.date = new Date($scope.locations.date);
		});
	}
]);

app.controller('LocationController', [
	'$scope',
	'$http',
	'$routeParams',
	'$location',
	($scope: any, $http: any, $routeParams: any, $location: any) => {
		$scope.root = root;
		const id = $routeParams.id;
		$http.get(root + 'api/location/' + id).then((location: any) => {
			$scope.location = location.data;
		});

		$scope.delete = (id: number) => {
			$http.delete(root + 'api/location/' + id).then(() => {
				console.log('Lokace ' + id + 'smazána');
				$location.path('all');
			});
		};
	}
]);

app.controller('AddController', [
	'$scope',
	'$http',
	'$location',
	'$httpParamSerializerJQLike',
	($scope: any, $http: any, $location: any, $httpParamSerializerJQLike: any) => {
		console.log('Add Controller');
		$scope.gps = '0N 0E';
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition((position: any) => {
				$scope.$apply(() => {
					$scope.gps = position.coords.latitude.toString().slice(0, 10) + 'N ' + position.coords.longitude.toString().slice(0, 10) + 'E';
				});
			});
		}
		else {
			console.log('Geolocation is not supported by this browser.');
		}

		$scope.save = () => {
			if ($scope.title && $scope.content && $scope.gps && $scope.myFile) {
				const file = $scope.myFile;
				const uploadUrl = root + 'api/savedata';
				const fd = new FormData();
				fd.append('file', file);

				$http
					.post(uploadUrl, fd, {
						transformRequest: angular.identity,
						headers: { 'Content-Type': undefined }
					})
					.then((imageName: any) => {
						console.log('Image upload done:', imageName.data);
						const locationData = {
							title: $scope.title,
							content: $scope.content,
							user: 'root',
							gps: $scope.gps,
							tags: $scope.tags,
							images: imageName.data
						};
						$http({
							method: 'POST',
							url: root + 'api/location',
							data: $httpParamSerializerJQLike(locationData),
							headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
						}).then((res: any) => {
							console.log('Create response:', res.toString());
							$location.path('all');
						});
					})
					.catch((err: any) => {
						console.log('Upload err :-(', err);
					});
			}
		};
	}
]);

app.controller('UpdateController', [
	'$scope',
	'$http',
	'$routeParams',
	'$httpParamSerializerJQLike',
	'$location',
	($scope: any, $http: any, $routeParams: any, $httpParamSerializerJQLike: any, $location: any) => {
		// Load data
		const id = $routeParams.id;
		$http.get(root + 'api/location/' + id).then((location: any) => {
			const data = location.data;
			$scope.title = data.title;
			$scope.content = data.content;
			$scope.gps = data.gps;
			$scope.tags = data.tags;
			$scope.images = data.images;
		});

		// Update data
		$scope.update = () => {
			const data = {
				title: $scope.title,
				content: $scope.content,
				user: 'root',
				gps: $scope.gps,
				tags: $scope.tags,
				images: $scope.images
			};

			$http({
				method: 'PUT',
				url: root + 'api/location/' + $routeParams.id,
				data: $httpParamSerializerJQLike(data),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
			}).then((res: any) => {
				console.log('Update response: ' + res.toString());
				$location.path('location/' + id);
			});
		};
	}
]);
