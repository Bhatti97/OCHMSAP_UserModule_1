OHCMSAP_APP.service('GeoService', ['NavigatorGeolocation', 'GeoCoder', '$http', function (NavigatorGeolocation, GeoCoder, $http) {
    this.manualdistance = function (lat1, lon1, lat2, lon2) {
        let p = new Promise(function (resolve, reject) {
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
            var d = 12742 * Math.asin(Math.sqrt(a));
            let ud = d + (d / 3);
            resolve(ud);
        });
        return p;
    }

    this.GetCoordinatesFromAddress = function (address) {
        let p = new Promise(function (resolve, reject) {
            GeoCoder.geocode({ address: address })
                .then(function (result) {
                    resolve(result[0].geometry.location);
                });

        });
        return p;
    }

    this.GetAddressFrmCoordinates = function (lat, lng) {
        let p = new Promise(function (resolve, reject) {
            GeoCoder.geocode({
                'latLng': { lat: lat, lng: lng }
            }).then(function (results, status) {
                if (results[1]) {
                    resolve(results[1]);
                }
            });
        });
        return p;
    }
    this.Distance = function (origin1, destinationA, origin2, destinationB) {
        var distances = [];
        let p = new Promise(function (resolve, reject) {
            var DistanceMatrixservice = new google.maps.DistanceMatrixService();
            DistanceMatrixservice.getDistanceMatrix(
                {
                    origins: [origin1, destinationA],
                    destinations: [destinationB, origin2],
                    travelMode: 'DRIVING',
                }, function (response) {
                    response.rows.forEach(row => {
                        row.elements.forEach(element => {
                            distances.push(element.distance.value);
                        });
                    });
                    var minDistance = distances.reduce((a, b) => Math.min(a, b));
                    response.rows.forEach(row => {
                        row.elements.forEach(element => {
                            if (element.distance.value == minDistance) {
                                resolve(element);
                            }
                        });

                    });

                });
        });
        return p;
    }
}]);