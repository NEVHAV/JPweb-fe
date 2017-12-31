/**
 * Created by NEVHAV on 26/12/17.
 */
angular.module('JPweb-fe')
    .controller('homeController', function ($scope, $http, $state, Cache){
        $scope.title = 'JPweb - Home';
        $(document).ready(function(){
            $('.carousel').carousel();
        });

        $scope.goMain = goMain;
        function  goMain() {
            $state.go('main');
        }
        $scope.user = {};
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
                $scope.iden = 1;
                var iden = 'iden';
                Cache.put(iden, $scope.iden);
                goMain();
            }, function (error) {
                console.log(error);
                console.log('error: method post');
                Materialize.toast('Your username hasn\'t had or your password is wrong!', 4000);
            })
        }
    });