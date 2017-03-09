(function() {

  "use strict";

	angular
	.module('ngClassifieds', ['ngMaterial','ui.router'])
	.config(function($mdThemingProvider, $stateProvider) {

		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');

		$stateProvider
			.state('classifieds', {
				url: '/classifieds',
				templateUrl: 'components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsCtr as self'
			})
			.state('classifieds.new', {
				url: '/new',
				templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
				controller: 'newClassifiedsCtr as self'
			})
			.state('classifieds.edit', {
				url: '/edit/:id',
				templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
				controller: 'editClassifiedsCtr as self',
				params: {
					classified: null
				}
			});

	});

})();