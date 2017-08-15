app.controller("selectMentorController", ["$q", "$scope", "$stateParams", "$rootScope", "$state", "$http",
    function ($q, $scope, $stateParams, $rootScope, $state, $http) {
        $scope.loading = true;
        $scope.mentors = null;
        $scope.application = null;
        $scope.origin = null;
        $scope.openGifs = {};

        function init() {
            $scope.loading = true;
            $scope.origin = $stateParams.origin;
            $http.get(apiBase + '/' + $stateParams.id + '/' + $stateParams.mentorSelectionCode)
                .success(function (application) {
                    $scope.application = application;
                    $http.get(apiBase + '/mentors')
                        .success(function (mentors) {
                            $scope.mentors = random(mentors);
                            $scope.loading = false;
                        })
                }).error(function () {
                    $state.go("join");
                }
            );
        }
        
        $scope.select = function (id) {
            $scope.loading = true;
            $http.post(apiBase + '/mentor/' + $stateParams.id + '/' + $stateParams.mentorSelectionCode, {mentorId: id})
                .success(function (application) {
                    init();
                })
                .error(function (error) {
                    $scope.loading = false;
                })
        };

        function random(array) {
            return array.sort(function () {
                return .5 - Math.random();
            });
        }

        init();

    }]);