app.controller("joinController", ["$q", "$scope", "$stateParams", "$rootScope", "$state", "$http",
    function ($q, $scope, $stateParams, $rootScope, $state, $http) {
        $scope.status = "FILLING"; // FILLING, SENDING, ERROR, SUCCESS
        $scope.hasError = {
            name: false,
            personalCode: false,
            email: false,
            phone: false,
            studentCode: false
        };

        $scope.application = {
            name: "",
            personalCode: "",
            email: "",
            phone: "",
            studentCode: ""
        };

        $scope.submit = function () {
            if (checkFields()) {
                $scope.status = "SENDING";
                $http.post(apiBase, $scope.application)
                    .success(function (application) {
                        $scope.status = "SUCCESS";
                        $state.go('selectMentor', {
                            id: application.id,
                            mentorSelectionCode: application.mentorSelectionCode,
                            origin: "apply"
                        });
                    })
                    .error(function (error) {
                        $scope.status = "ERROR";
                    });
            }
        };

        function checkFields() {
            return true;
        }

    }]);