OHCMSAP_APP.controller('Stress_Controller', function ($scope, $http) {
    //here we do code
    $scope.StressOBJ = {
        "stress_id": 0,
        "stress_Name": "",
        "stress_type": "Non-Emergency"
    };
    $scope.StressList = [];

    $scope.LoadAllStress = function () {
        $http.get('/api/Stresses').then(function (res) {
            $scope.StressList = res.data;
        });
    }
    $scope.LoadAllStress();

    $scope.LoadData = function (stressObj) {
        $scope.StressOBJ = {
            "stress_id": stressObj.stress_id,
            "stress_Name": stressObj.stress_Name,
            "stress_type": stressObj.stress_type
        };
        //$scope.StressOBJ.stress_id = stressObj.stress_id;
        //$scope.StressOBJ.stress_Name = stressObj.stress_Name;
        //$scope.StressOBJ.stress_type = stressObj.stress_type;

    }

    $scope.Clear = function () {
        $scope.StressOBJ = {
            "stress_id": 0,
            "stress_Name": "",
            "stress_type": "Non-Emergency"
        };
    }

    //public void Save(){
    //}
    $scope.Save = function () {            //Save code
        var id = $scope.StressOBJ.stress_id;
        if (id == 0) {              //insert
            $http.post('/api/Stresses', JSON.stringify($scope.StressOBJ), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                $scope.StressOBJ = {
                    "stress_id": 0,
                    "stress_Name": "",
                    "stress_type": "Non-Emergency"
                };
                $scope.LoadAllStress();
            }, function (err) {
                console.log(err);
            });
        } else {
            $http.put('/api/Stresses/' + id, JSON.stringify($scope.StressOBJ), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                console.log(res);
                $scope.StressOBJ = {
                    "stress_id": 0,
                    "stress_Name": "",
                    "stress_type": "Non-Emergency"
                };
                $scope.LoadAllStress();
            }, function (err) {
                console.log(err);
            });

        }
    }
    $scope.Delete = function (id) {
        if (confirm('Are you really want to delete this stress!')) {
            $http.delete('/api/Stresses/' + id).then(function (res) {
                $scope.LoadAllStress();
            });
        }

    }
});