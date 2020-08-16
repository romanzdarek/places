import * as Angular from 'angular';
declare const angular: Angular.IAngularStatic;
const core = angular.module('core', []);

core.filter('DateFromMiliseonds', () => {
	return (miliseconds: number): string => {
		const date = new Date(miliseconds);
		return date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
	};
});
