(function() {

	"use strict";
	
	angular
	.module("ngClassifieds")
	.controller("classifiedsCtr", function($scope, $state, $http, classifiedsFactory,$mdSidenav,$mdToast, $mdDialog) {
		
		var self = this;
		var contact = {
			name: "Jose Chavez",
			phone: "(555) 555-5555",
			email: "jose@gmail.com"
		}


		self.saveEdit=saveEdit;
		self.openSidebar=openSidebar;
		self.closeSidebar=closeSidebar;
		self.saveClassified=saveClassified;
		self.editClassified=editClassified;
		self.deleteClassified=deleteClassified;


		self.classifieds;
		self.categories;
		self.editing;
		self.classified;
		
		classifiedsFactory.getClassifieds().then(function(classifieds){
			self.classifieds = classifieds.data;
			self.categories = getCategories(self.classifieds);
		});

		 $scope.$on('newClassified', function(event, data) {
	        data.id = self.classifieds.length + 1;
	        self.classifieds.push(data);
	        showToast('Classified Saved');
	      });

		 $scope.$on('editSaved', function(event, message) {
	        showToast(message);
	      });

		function openSidebar(){
        	$state.go('classifieds.new');
		}

		function closeSidebar(){
			$mdSidenav('left').close();
		}

		function saveClassified(classified) {
			if(classified){
				classified.contact = contact;
				self.classifieds.push(classified);
				self.classified = {};
				self.closeSidebar();
				showToast("classified saved!");
			}	
		}

		function editClassified(classified) {
			$state.go('classifieds.edit', {
				id: classified.id,
				classified: classified
			});
		}

		function saveEdit(){
			self.editing = false;
			self.classified = {};
			closeSidebar();
			showToast("Edit saved!");
		}

		function deleteClassified(event, classified){

			var confirm = $mdDialog.confirm()
			.title('Are you sure want to delete' + classified.title + '?')
			.ok('Yes')
			.cancel('No')
			.targetEvent(event);
			$mdDialog.show(confirm).then(function() {
				var index = self.classifieds.indexOf(classified);
				self.classifieds.splice(index, 1);
			},function(){


			});
		}

		function showToast(message) {
			$mdToast.show(
				$mdToast.simple()
				.content("classified Saved!")
				.position('top, right')
				.hideDelay(3000)
			);
		}

		function getCategories(classifieds){

			var categories = [];

			angular.forEach(classifieds, function(item){

				angular.forEach(item.categories, function(category){
					categories.push(category);
				});
			});

			return _.uniq(categories);
		}
	
	});
})();