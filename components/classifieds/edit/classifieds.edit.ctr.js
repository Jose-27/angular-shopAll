(function(){
	
	"use strict";

	angular
	.module('ngClassifieds')
	.controller('editClassifiedsCtr', function($mdSidenav, $state, $scope, $mdDialog, $timeout, classifiedsFactory) {

		var self = this;



		self.closeSidebar = closeSidebar;
		self.saveEdit = saveEdit;
		self.classified = $state.params.classified;

		self.sidebarTitle = 'Edit Classified';

		$timeout(function() {
	    	$mdSidenav('left').open();     
	    });

	    $scope.$watch('self.sidenavOpen', function(sidenav){
	    	if(sidenav == false){
	    		$mdSidenav('left')
	    		.close()
	    		.then(function() {
	    			$state.go('classifieds');
	    		});
	    	}
	    });

	 	function closeSidebar(){
	 		self.sidenavOpen = false;
	 	}

	 	function saveEdit() {
	 		$scope.$emit('editSaved', 'Edit saved!');
	 		self.sidenavOpen = false;
	      }
	});

})();