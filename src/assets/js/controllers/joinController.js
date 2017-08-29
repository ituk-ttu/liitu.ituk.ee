app.controller("joinController", ["$q", "$scope", "$stateParams", "$rootScope", "$state", "$http",
    function ($q, $scope, $stateParams, $rootScope, $state, $http) {
        $scope.status = "FILLING"; // FILLING, SENDING, ERROR, SUCCESS

        $scope.application = {
            name: "",
            personalCode: "",
            email: "",
            phone: "",
            studentCode: ""
        };

        $scope.patterns = {
            personalCode: "^[1-6][0-9]{2}[1,2][0-9][0-9]{2}[0-9]{4}$",
            studentCode: "^[0-1][0-9]{5}(IAPB|IADB)$"
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