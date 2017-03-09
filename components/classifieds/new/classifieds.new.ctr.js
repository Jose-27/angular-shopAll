(function(){
	
	"use strict";

	angular
	.module('ngClassifieds')
	.controller('newClassifiedsCtr', function($mdSidenav, $state, $scope, $mdDialog, $timeout, classifiedsFactory) {

		var self = this;



		self.closeSidebar = closeSidebar;
		self.saveClassified = saveClassified;

		self.sidebarTitle = 'Add a Classified';

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

	 	function saveClassified(classified) {
	        if(classified) {

	          classified.contact = {
	            name: "Jose", 
	            phone: "(555) 555-5555",
	            email: "jose@gmail.com"
	          }

	          $scope.$emit('newClassified', classified)          
	          self.sidenavOpen = false;
	        }
	      }
	});

})();