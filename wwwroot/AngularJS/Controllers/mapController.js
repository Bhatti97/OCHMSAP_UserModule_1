
OHCMSAP_APP.controller('mapCtrl', ['$scope', 'NgMap', 'NavigatorGeolocation', 'GeoCoder', 'GeoService', '$timeout', '$interval',
    function ($scope, NgMap, NavigatorGeolocation, GeoCoder, GeoService, $timeout, $interval) {
        vm = this;
        var intervalPromise;
        $scope.search = "";
        $scope.clickmarkers = [];
        $scope.currentPin;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                $scope.currentPin = { lat: lat, lng: lng };
            });
        }
        $scope.locations = [
            { lat: 31.5326242257308, lng: 74.36432629475098, type: 'Therpist', address: 'Saddar Town, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.55043629118326, lng: 74.37042027363282, type: 'Psychologist', address: 'Dharampura, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.53500180267081, lng: 74.3309381569336, type: 'Psychologist', address: 'Shadman 1 Shadman, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.50690594915978, lng: 74.34467106708985, type: 'Therpist', address: 'Block C3 Block C 3 Gulberg III, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.561588030437264, lng: 74.33707197410968, type: 'Therpist', address: 'Garhi Shahu, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.559540243525923, lng: 74.32479818565753, type: 'Psychologist', address: 'Garhi Shahu, Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.581898020479585, lng: 74.3428372185806, type: 'Psychologist', address: 'Sultan Pura Lahore, Punjab, Pakistan', dd: 0 },
            { lat: 31.59912592744775, lng: 74.33777795657056, type: 'Therpist', address: 'Shad Bagh, Lahore, Punjab, Pakistan', dd: 0 }
        ];
        $scope.minDuration = { d: 0, status: 0 };
        vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPPEf0ORR6kta7UGagJCbUl-bJ-PKgk3U&callback=initMap";
        vm.mapCenter = null;
        NgMap.getMap("map").then(function (map) {
            vm.map = map;
        }, function (err) {
            console.log(err);
        });


        $scope.customMarkers = [
            // { address: "1600 pennsylvania ave, washington DC", "class": "my1" },
            // { address: "600 pennsylvania ave, washington DC", "class": "my2" },
        ];
        var duration_Values = [];
        var durationObjs = [];
        $scope.GetAddress = function (lat, lng) {
            console.log(lat, lng);
            GeoService.GetAddressFrmCoordinates(parseFloat(lat), parseFloat(lng)).then(m => {
                console.log(m);
            });
        }
        function CalulateDitancesFromLocations(lat1, lat2, destinationA) {
            duration_Values = [];
            durationObjs = [];
            let p = new Promise(function (resolve, reject) {
                $scope.locations.forEach(loc => {
                    GeoService.Distance({ lat: lat1, lng: lat2 }, destinationA, { lat: loc.lat, lng: loc.lng }, loc.address).then(d => {
                        loc.dd = d;
                        duration_Values.push(d.duration.value);
                        durationObjs.push(d.duration);
                    });
                    // GeoService.manualdistance(lat1, lat2, loc.lat, loc.lng).then(m => {
                    //     loc.distance = parseFloat(parseFloat(m).toFixed(2));
                    //     distances.push(loc.distance);
                    // });
                });
                resolve(1);
            });
            return p;
        }
        function GetMinDistance() {
            var minDuration = duration_Values.reduce((a, b) => Math.min(a, b));
            durationObjs.forEach(duration => {
                if (duration.value == minDuration) {
                    $scope.minDuration.d = duration.text;
                    $scope.minDuration.status = 1;
                    return;
                }
            })
        }
        function DistanceHelper(lat1, lng1) {

            $scope.currentPin = { lat: lat1, lng: lng1 };
            GeoService.GetAddressFrmCoordinates(lat1, lng1).then(address => {
                var city = (address.address_components[address.address_components.length - 3].long_name == 'Lahore') ? address.address_components[address.address_components.length - 3].long_name : address.address_components[address.address_components.length - 4].long_name;
                $scope.search = address.formatted_address;
                if (city == "Lahore") {
                    CalulateDitancesFromLocations(lat1, lng1, address.formatted_address).then(m => {
                        $timeout(GetMinDistance, 1500);
                    });
                }
                else {
                    $scope.start();
                }
            });
        }
        vm.click = function (e) {
            // console.log(e.latLng.lat(), e.latLng.lng());
            var lat1 = e.latLng.lat();
            var lng1 = e.latLng.lng();
            $scope.customMarkers = [];
            $scope.minDuration = { d: 0, status: 0 };
            var clickmarker = { lat: e.latLng.lat(), lng: e.latLng.lng(), status: true };
            $scope.customMarkers.push(clickmarker);
            DistanceHelper(lat1, lng1);
        }
        $scope.SearchAddress = function (search) {
            GeoService.GetCoordinatesFromAddress(search).then(c => {
                $scope.customMarkers = [];
                $scope.minDuration = { d: 0, status: 0 };
                var clickmarker = { lat: c.lat(), lng: c.lng(), status: true };
                $scope.customMarkers.push(clickmarker);
                DistanceHelper(c.lat(), c.lng());
            })
        }
        $scope.start = function () {
            $scope.stop();
            intervalPromise = $interval(changeStatus, 20000);
        }
        $scope.stop = function () {
            $interval.cancel(intervalPromise);
        }
        function changeStatus() {
            if ($scope.minDuration.status == 0 && $scope.customMarkers.length > 0) {
                $scope.minDuration.status = 2;
                $scope.stop;
            }

        }
        function callback(response, status) {
            console.log(response)
            // See Parsing the Results for
            // the basics of a callback function.
        }



    }]);