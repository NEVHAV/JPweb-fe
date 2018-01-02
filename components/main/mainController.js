/**
 * Created by NEVHAV on 12/11/17.
 */
angular.module('JPweb-fe')
    .controller('mainController', function ($scope, $http, API_URL, API_URL_VOCALB, API_URL_GRAMMAR, $cookieStore, $state) {

        API_URL = API_URL_VOCALB;
        $scope.title = 'JPweb';
        $scope.title2 = 'Từ vựng';
        $scope.lessonTitle = 'Bài 1';

        //identify user
        var userID = $cookieStore.get('iden');
        if (userID >= 1) {
            $scope.idenUser = function () {
                return true;
            };
            $http.get(API_URL + "user/" + userID).then(function (response) {
                $scope.user = response.data.data[0];
                console.log($scope.user);
            }, function (error) {});
            $scope.dropdown = function () {
                $(document).ready(function () {
                    $('.dropdown-button').dropdown({
                            inDuration: 300,
                            outDuration: 225,
                            constrainWidth: false,
                            hover: false,
                            gutter: 0,
                            belowOrigin: true,
                            alignment: 'left',
                            stopPropagation: false
                        }
                    );
                });
            };
            $scope.logOut = function () {
                $cookieStore.remove('iden');
                $state.go('home');
            }
        }
        else {
            $scope.idenUser = function () {
                return false;
            };
        }

        //giao dien
        $scope.change = function (id) {
            $scope.title2 = id;
        };

        $http.get(API_URL + "listVocalb").then(function (response) {
            $scope.allListVocalb = response.data.data;
            }, function (error) {});

        //vocalb
        $http.get(API_URL + "numberLesson").then(function (response) {
           $scope.numberLessons = response.data.data;
        }, function (error) {
            console.log('numberLesson error!');
        });

        $http.get(API_URL + "listVocalb/1").then(function (response) {
            $scope.listVocalbs = response.data.data;
        }, function (error) {});

        $scope.selectLesson = function (bai) {
            $http.get(API_URL + "listVocalb/" + bai).then(function (response) {
                $scope.listVocalbs = response.data.data;
            }, function (error) {
                console.log('listVocalb error!');
            });
        };

        $scope.changeLessonTitle = function (lessonTitle) {
            $scope.lessonTitle = "Bài " + lessonTitle;
        };

        $scope.selectVocalb = function (STT) {
            $http.get(API_URL + "vocalb/" + STT).then(function (response) {
                $scope.vocalbs = response.data.data;
            }, function (error) {
                console.log('vocalb error!');
            });
        };

        //minitest
        $scope.minitest = function () {
            $(document).ready(function () {
                $('#minitest').modal({
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
        $scope.number = 10;
        $scope.type_test = null;
        $scope.number_test = function (number) {
            $scope.number = number;
        };
        $scope.type = function (type) {
            $scope.type_test = type;
        };
        $scope.time_default = false;
        $scope.time = function () {
            if ($scope.time_default === false) {
                $scope.time_default = true;
            }
            else
                $scope.time_default = false;
        };
        $scope.goToMinitest = function () {
            $http.get(API_URL + "minitest/" + $scope.number + "/" + $scope.type_test + "/" + $scope.time_default).then(function (response) {
               $scope.listVocalbTests = response.data.data;
               $scope.randomNumbers = response.data.random;
               // console.log($scope.randomNumbers);
               $scope.answer = function () {
                    return false;
               };
               $scope.score = 0;
            }, function (error) {
                console.log('listVocalbTests error!');
            });
        };
        $scope.i = 'no';
        $scope.done = function () {
            if ($scope.i === 'no') {
                $scope.answer = function () {
                    return true;
                };
            }
        };
        // $scope.rd = Math.floor((Math.random() * (4 - 1)) + 1);
        $scope.test = function () {
            $(document).ready(function () {
                $('#test').modal({
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
        $scope.check = function (key, ans) {
            console.log(key + "," + ans);
            if (key === ans)
                  $scope.score = $scope.score + 1;
        };

        //Buybook
        $scope.buybook = function () {
            $(document).ready(function () {
                $('#buybook').modal({
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
        $http.get(API_URL + 'listBook').then(function (response) {
            $scope.listbooks = response.data.data;
        }, function (error) {
            console.log('listbook error!');
        });

        $(document).ready(function() {
            $('select').material_select();
        });
        $(document).ready(function(){
            $('ul.tabs').tabs();
        });

        //favourite
        $scope.love = function () {
            return true;
        };
        $scope.id = 'no';
        $scope.favorite = function () {
            if ($scope.id === 'yes')
            {
                $scope.love = function () {
                    return true;
                };
                $scope.id = 'no';
            }
            else
            {
                $scope.love = function () {
                    return false;
                };
                $scope.id = 'yes';
            }
        };

        //sign in
        $scope.signInModal = function () {
            $(document).ready(function () {
                $('#signInModal').modal({
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

        $scope.signIn = function () {
            console.log('go');
            var url = "http://localhost:8080/JPweb-be/logIn";
            $http({
                method: 'POST',
                url: url,
                data: $scope.user
            }).then(function (response) {
                console.log(response);
                console.log('success');
                $scope.iden = response.data.data;
                if ($scope.iden === 0) {
                    $state.go('admin');
                }
                else {
                    $cookieStore.put('iden', $scope.iden);
                    location.reload();
                }
            }, function (error) {
                console.log(error);
                console.log('error: method post');
                Materialize.toast('Tên người dùng hoặc mật khẩu không đúng!', 4000);
            })
        };
    });