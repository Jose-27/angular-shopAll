(function(){
	"use strict";


	angular
	.module("ngClassifieds")
	.directive("classifiedCard", function() {
		return {
			templateUrl: "components/classifieds/card/classified-card.tpl.html",
			scope: {
				classifieds: "=",
				classifiedsFilter: "=searchFilter",
          		category: "=categoryFilter"
			},
			controller: classifiedCardController,
			controllerAs: 'self'
		}

		function classifiedCardController($state, $scope, $mdDialog){

			var self = this;
			self.editClassified = editClassified;
			self.deleteClassified = deleteClassified;


			function editClassified(classified) {
				$state.go('classifieds.edit', {
					id: classified.id,
					classified: classified
				});
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

		}
	});
})();