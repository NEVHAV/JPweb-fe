/**
 * Created by NEVHAV on 01/01/18.
 */
angular.module('JPweb-fe')
    .controller('adminController', function ($scope, $http, API_URL, API_URL_VOCALB, API_URL_GRAMMAR, $cookieStore, $state) {
        API_URL = API_URL_VOCALB;
        $scope.title = 'JPweb - Admin';
        $(".button-collapse").sideNav();

        $scope.showUser = function () {
            $scope.user = function () {
                return true;
            };
            $scope.book = function () {
                return false;
            };
            $scope.newBook = function () {
                return false;
            };
            $http.get(API_URL + "listUser").then(function (response) {
                $scope.listUser = response.data.data;
            }, function (error) {});

            $scope.userProfile = function (id) {
                $http.get(API_URL + "user/" + id).then(function (response) {
                    $scope.profile = response.data.data[0];
                    console.log($scope.profile);
                }, function (error) {});
                $(document).ready(function () {
                    $('#userProfile').modal({
                        dismissible: true,
                        opacity: .5,
                        inDuration: 300,
                        outDuration: 200,
                        startingTop: '4%',
                        endingTop: '10%',
                        complete: function() {}
                    }).modal('open');
                });
            };

            $scope.deleteUser = function (userID) {
                let confirmDelete = confirm('Bạn có chắc chắn xóa người dùng này?');
                if (confirmDelete) {
                    $http({
                        method: 'DELETE',
                        url: API_URL + "deleteUser/" + userID
                    }).then(function (response) {
                        console.log('delete', response);
                        location.reload();
                    }, function (error) {});
                    Materialize.toast('Đã xóa!');
                }
            }
        };

        $scope.showBook = function () {
            $scope.book = function () {
                return true;
            };
            $scope.user = function () {
                return false;
            };
            $scope.newBook = function () {
                return false;
            };
            $http.get(API_URL + "listBook").then(function (response) {
                $scope.listBook = response.data.data;
            }, function (error) {});

            $scope.dropdown = function () {
                $(document).ready(function () {
                    $('.dropdown-button').dropdown({
                            inDuration: 300,
                            outDuration: 225,
                            constrainWidth: false,
                            hover: false,
                            gutter: 0,
                            belowOrigin: false,
                            alignment: 'left',
                            stopPropagation: false
                        }
                    );
                });
            };
        };

        $scope.showNewBook = function () {
            $scope.newBook = function () {
                return true;
            };
            $scope.book = function () {
                return false;
            };
            $scope.user = function () {
                return false;
            };
            $scope.newID = 1;
            $scope.arrayID = [{
                value: 1
            }];
            $scope.addNew = function () {
                $scope.newID += 1;
                $scope.arrayID.push({value: $scope.newID});
                console.log($scope.arrayID);
            };
            $scope.deleteNew = function (index) {
                $scope.arrayID.splice(index, 1);
                console.log('1', index);
            };
        }
    });