function getTanDeg(deg) {
  var rad = deg * Math.PI / 180;
  return Math.tan(rad);
}

var app = angular.module('myApp', ["ngRoute"]);

app.controller('pipeCtrl', function($scope) {
	$scope.diam = 1220;
	$scope.stenka = 12;
	$scope.dlina = 11.6; 
	$scope.shov = 1.01;
	$scope.tochnost = 3;
	$scope.$watchGroup(['diam', 'stenka', 'dlina', 'shov', 'tochnost'], function() {$scope.test();});
	$scope.test = function() {
		const plotnost = 7850;
		var m_1m = Math.PI *(($scope.diam/1000)**2-(($scope.diam-2*$scope.stenka)/1000)**2)/4*plotnost*$scope.shov;
		$scope.massa_1m = m_1m.toFixed( $scope.tochnost );
		$scope.massa = (m_1m * $scope.dlina).toFixed( $scope.tochnost );
		var okr_vnesh = Math.PI * $scope.diam;
		$scope.okr_vnesh = okr_vnesh.toFixed( $scope.tochnost );
		$scope.okr_vnutr = (Math.PI * ($scope.diam - 2 * $scope.stenka)).toFixed( $scope.tochnost );
		$scope.ploshad = (okr_vnesh / 1000 *  $scope.dlina).toFixed( $scope.tochnost );
		$scope.ob_trub = (Math.PI * ($scope.diam / 1000)**2 / 4 * $scope.dlina).toFixed( $scope.tochnost );
		$scope.ob_polost = (Math.PI * (($scope.diam - 2 * $scope.stenka) / 1000)**2 / 4 * $scope.dlina).toFixed( $scope.tochnost );
	};
	$scope.test();
});

app.controller('gib_gostCtrl', function($scope) {
	$scope.p_param = {
		159 : { ur : 15, l1 : 1, l: 9.8, max: 27},
		219 : { ur : 15, l1 : 1, l: 9.8, max: 27},
		273 : { ur : 15, l1 : 1, l: 9.8, max: 27},
		325 : { ur : 15, l1 : 1, l: 9.8, max: 27},
		377 : { ur : 15, l1 : 1, l: 9.8, max: 27},
		426 : { ur : 20, l1 : 1, l: 9.8, max: 21},
		530 : { ur : 25, l1 : 1.9, l: 11.6, max: 18},
		720 : { ur : 35, l1 : 1.9, l: 11.6, max: 9},
		820 : { ur : 35, l1 : 1.9, l: 11.6, max: 9},
		1020 : { ur : 40, l1 : 2.4, l: 11.6, max: 9},
		1220 : { ur : 60, l1 : 3.5, l: 11.6, max: 6},
		1420 : { ur : 60, l1 : 3.5, l: 11.6, max: 6},
	};
	$scope.diam = $scope.p_param[1020];
	$scope.ugol = 3;
	$scope.sekcii = 1;
	$scope.last_ugol = $scope.ugol;
	$scope.tochnost = 3;
	$scope.$watchGroup(['diam', 'ugol', 'sekcii', 'last_ugol', 'tochnost'],function() {$scope.test();});
	$scope.test = function() {
		if ($scope.sekcii == 1) {
			$scope.mySwitch = true;
			$scope.last_ugol = $scope.ugol;
		}
		else {
			$scope.mySwitch = false;
		};
		if( $scope.diam != undefined) {
			var l2 = Math.PI * $scope.last_ugol * $scope.diam.ur / 180;
			var l3 = $scope.diam.l - $scope.diam.l1 - l2;
			var L_big = $scope.sekcii * $scope.diam.l - $scope.diam.l1 - l3;
			var R = (L_big * 180) / (Math.PI * $scope.ugol);
			var t1 = R * getTanDeg( $scope.ugol / 2 );
			$scope.T1 = ( t1 + $scope.diam.l1).toFixed( $scope.tochnost );
			$scope.T2 = ( t1 + l3).toFixed( $scope.tochnost );
			$scope.Bis = ( t1**2 / ( 2 * R)).toFixed( $scope.tochnost );
			$scope.Rad = $scope.diam.ur
			$scope.Max_grad = $scope.diam.max
			$scope.truba = $scope.diam.l
		};
	};
	$scope.test();
});

app.controller('area_troyCtrl', function($scope) {
	$scope.diam = 1220;
	$scope.diam2 = 1020;
	$scope.dlina = 1000;
	$scope.visota = 1000;
	$scope.tochnost = 3;
	$scope.$watchGroup(['diam', 'diam2', 'dlina', 'visota', 'tochnost'], function() {$scope.test();});
	$scope.test = function() {
		var t1 = Math.PI * ($scope.diam / 1000) * ($scope.dlina / 1000);
		var t2 = Math.PI * ($scope.diam2 / 1000) * (($scope.visota - $scope.diam / 2) / 1000);
		$scope.Ss = (t1 + t2).toFixed( $scope.tochnost );
	};
	$scope.test();
});

app.controller('area_detCtrl', function($scope) {
	$scope.diam = 1220;
	$scope.rad = 5000;
	$scope.tochnost = 3;
	$scope.$watchGroup(['diam','rad','tochnost'],function() {$scope.test();});
	$scope.test = function() {
		var a_tor = Math.PI**2 * ($scope.diam / 1000) * ($scope.rad * 2 / 1000);
		$scope.Ot_90 = (a_tor / 4).toFixed( $scope.tochnost );
		$scope.Ot_30 = (a_tor / 12).toFixed( $scope.tochnost );
		$scope.Ot_60 = (a_tor / 6).toFixed( $scope.tochnost );
		$scope.Ot_45 = (a_tor / 8).toFixed( $scope.tochnost );
	};
	$scope.test();
});

app.controller('area_zaglCtrl', function($scope) {
	$scope.diam = 159;
	$scope.visota = 20;
	$scope.tochnost = 3;
	$scope.$watchGroup(['diam','visota','tochnost'],function() {$scope.test();});
	$scope.test = function() {
		$scope.area = (Math.PI * ($scope.diam ** 2 + 4 * $scope.visota ** 2) / 4 / 10**6).toFixed( $scope.tochnost );
	};
	$scope.test();
});

app.controller('area_perCtrl', function($scope) {
	$scope.diam = 159;
	$scope.diam2 = 108;
	$scope.visota = 65;
	$scope.tochnost = 3;
	$scope.test = function() {
		var a = ($scope.diam - $scope.diam2) / 2;
		var c = Math.sqrt($scope.visota**2 + a**2);
		$scope.area = (Math.PI * c * ($scope.diam / 2 + $scope.diam2 / 2) / 10**6).toFixed( $scope.tochnost );
	};
	$scope.$watchGroup(['diam','diam2','visota','tochnost'], $scope.test);
	$scope.test();
});

app.controller('gaz_pressureCtrl', function($scope) {
	$scope.p1 = 5.4;
	$scope.p2 = 4.0;
	$scope.L = 138;
	$scope.x = 70;
	$scope.tochnost = 3;
	$scope.test = function() {
		$scope.px = Math.sqrt($scope.p1**2 - ($scope.p1**2 - $scope.p2**2) * $scope.x / $scope.L).toFixed( $scope.tochnost );
	};
	$scope.$watchGroup(['p1','p2','L','x','tochnost'], $scope.test);
	$scope.test();
});

app.controller('gaz_tempCtrl', function($scope) {
	$scope.t1 = 20;
	$scope.t2 = 0;
	$scope.L = 138;
	$scope.x = 70;
	$scope.tochnost = 0;

	$scope.test = function() {
		var dx = $scope.x / $scope.L
		$scope.tx = ($scope.t1 - ($scope.t1 - $scope.t2) * (1 + (dx - 1) * Math.exp(-dx))).toFixed( $scope.tochnost );
	};
	$scope.$watchGroup(['t1','t2','L','x','tochnost'], $scope.test);
	$scope.test();
});

app.controller('massa_proklCtrl', function($scope) {
	$scope.a = 11;
	$scope.h = 18;
	$scope.D = 85;
	$scope.tochnost = 2;

	$scope.test = function() {
		D = $scope.D / 1000;
		h = $scope.h / 1000;
		a = $scope.a / 1000;
		var L = D * Math.PI;
		var S1 = (h - a) * (h);
		var S2 = Math.PI * (a**2) / 4;
		var V = (S1 + S2) * L;
		$scope.massa = (V * 7850).toFixed( $scope.tochnost );
	};
	$scope.$watchGroup(['a','h','D','tochnost'], $scope.test);
	$scope.test();
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pipe.html",
        controller : "pipeCtrl"
	})
    .when("/gib_gost", {
        templateUrl : "gib_gost.html",
        controller : "gib_gostCtrl"
	})
    .when("/area_troy", {
        templateUrl : "area_troy.html",
        controller : "area_troyCtrl"
	})
    .when("/area_zagl", {
        templateUrl : "area_zagl.html",
        controller : "area_zaglCtrl"
	})
    .when("/area_per", {
        templateUrl : "area_per.html",
        controller : "area_perCtrl"
	})
    .when("/area_det", {
        templateUrl : "area_det.html",
        controller : "area_detCtrl"
	})
    .when("/gaz_pressure", {
        templateUrl : "gaz_pressure.html",
        controller : "gaz_pressureCtrl"
	})
    .when("/gaz_temp", {
        templateUrl : "gaz_temp.html",
        controller : "gaz_tempCtrl"
	})
    .when("/massa_prokl", {
        templateUrl : "massa_prokl.html",
        controller : "massa_proklCtrl"
	});
});

