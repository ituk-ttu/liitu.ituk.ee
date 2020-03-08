app.controller("joinController", ["$q", "$scope", "$stateParams", "$rootScope", "$state", "$http",
    function ($q, $scope, $stateParams, $rootScope, $state, $http) {
        $scope.status = "FILLING"; // FILLING, SENDING, ERROR, SUCCESS

        $scope.application = {
            firstName: "",
            lastName: "",
            personalCode: "",
            email: "",
            studentCode: "",
            curriculum: ""
        };



        $scope.patterns = {
            personalCode: "^[0-9]{11}"
        };


        $scope.submit = function () {
            if (checkFields()) {
                $scope.status = "SENDING";
                $scope.application.curriculum = $scope.application.studentCode.substring(6);
                $http.post(apiBase, $scope.application)
                    .success(function (application) {
                        $scope.status = "SUCCESS";
                        $state.go('selectMentor', {
                            id: application.id,
                            mentorSelectionCode: application.mentorSelectionCode,
                            origin: "application"
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
