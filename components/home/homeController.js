/**
 * Created by NEVHAV on 26/12/17.
 */
angular.module('JPweb-fe')
    .controller('homeController', function ($scope, $http, $state, $cookieStore){
        $scope.title = 'JPweb - Home';
        $cookieStore.remove('iden');
        $(document).ready(function(){
            $('.carousel').carousel();
        });

        $scope.goMain = goMain;
        function goMain() {
            $state.go('main');
        }
        $scope.sign = function () {
            return false;
        };
        $scope.goSignUp = function () {
            $scope.sign = function () {
                return true;
            }
        };
        $scope.goSignIn = function () {
            $scope.sign = function () {
                return false;
            }
        };
        $scope.signIn = function () {
            console.log('sign in');
            var url = "http://localhost:8080/JPweb-be/logIn";
            $http({
                method: 'POST',
                url: url,
                data: $scope.user
            }).then(function (response) {
                console.log(response);
                console.log('success');
                $scope.iden = response.data.data;
                $scope.iden = response.data.data;
                if ($scope.iden === 0) {
                    $cookieStore.put('iden', $scope.iden);
                    $state.go('admin');
                }
                else {
                    $cookieStore.put('iden', $scope.iden);
                    goMain();
                }
            }, function (error) {
                console.log(error);
                console.log('error: method post');
                Materialize.toast('Tên đăng nhập hoặc mật khẩu của bạn không chính xác!', 4000);
            })
        };

        $scope.signUp = function () {
            console.log('sign up');
            if ($scope.newUser.password === $scope.newUser.repassword) {
                var url = "http://localhost:8080/JPweb-be/register";
                $http ({
                    method: 'POST',
                    url: url,
                    data: $scope.newUser
                }).then(function (response) {
                    console.log(response);
                    console.log('success');
                    Materialize.toast('Tài khoản đã được tạo thành công!', 4000);
                }, function (error) {
                    console.log(error);
                    console.log('error: method post');
                    Materialize.toast('Tên đăng nhập hoặc email của bạn bị trùng!', 4000);
                })
            }
            else {
                console.log('repassword wrong!');
                Materialize.toast('Mật khẩu và xác nhận mật khẩu không giống nhau!', 4000);
            }
        };
    });