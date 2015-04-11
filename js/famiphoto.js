'use strict';

angular.module('famiPhoto',[])
    .factory('famiphotoService', ['$rootScope', function($rootScope){

        // initialize database
        function Init(){
            var members = [
                {name: 'taro', file: 'taro.JPG'},
                {name: 'jiro', file: 'jiro.JPG'},
                {name: 'saburo', file: 'saburo.JPG'}
            ];
    
            return members;
        };
    

        function getMemberlist(members){
            var names=[];
            for ( var i in members){
                names.push( members[i].name );
            };
            return names;
        }

        function getFilename(members,target){
            for (var i in members){
                if (members[i].name == target) {
                    return members[i].file
                };
            };
            return 'none.jpg'
        }

        return {
            init:Init,
            getmemberlist:getMemberlist,
            getfilename:getFilename
        };

    }]);
            

angular.module('famiPhoto')
    .controller('famiphotoController', ['$scope','famiphotoService', function($scope,famiphotoService){

        $scope.members = famiphotoService.init();
        $scope.current = {name:'jiro', file:'none.jpg'};

        $scope.names = famiphotoService.getmemberlist($scope.members);

        $scope.$watchCollection( 'current.name' ,
            function(){
            console.log('controller scope: ' + $scope.$id);
                console.log('changed');
                $scope.current.file = famiphotoService.getfilename($scope.members,$scope.current.name);
            });

    }]);
