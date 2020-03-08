app.controller("selectMentorController", ["$q", "$scope", "$stateParams", "$rootScope", "$state", "$http",
    function ($q, $scope, $stateParams, $rootScope, $state, $http) {
        $scope.loading = true;
        $scope.mentors = null;
        $scope.application = null;
        $scope.origin = null;
        $scope.openGifs = {};

        function init() {
            $scope.loading = true;
            $scope.openGifs = {};
            $scope.origin = $stateParams.origin;
            $http.get(apiBase + '/application/apply/' + $stateParams.id + '/' + $stateParams.mentorSelectionCode)
                .success(function (application) {
                    $scope.application = application;
                    if($scope.application.mentor != null) {
                        $http.get(apiBase + '/mentor/' + $scope.application.mentor.id)
                            .success(function (mentors) {
                                $scope.mentors = mentors;
                                $scope.loading = false;
                        })
                    } else {
                        $http.get(apiBase + '/mentor/active')
                            .success(function (mentors) {
                                $scope.mentors = random(mentors);
                                $scope.loading = false;
                            })
                    }

                }).error(function () {
                    $state.go("join");
                }
            );
        }
        
        $scope.select = function (id) {
            $scope.loading = true;
            $scope.applicationPost = {
                applicationId: $scope.application.applicationId,
                mentorId: id
            };
            $http.put(apiBase + '/application/mentor/', $scope.applicationPost)
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
