'use strict';
var moment = require('moment');

var path = process.cwd();

module.exports = function (app, passport) {


	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:data')
		.get(function (req, res) {
			//{"unix":1450137600,"natural":"December 15, 2015"
			var data = req.params.data;
			console.log(req.params.data);
			
			var answer ={"unix":null, "natural":null};
			var m;
			var strdate=/(\w+)\s(\d{1,2}),\s(\d{2,4})/i.exec(data);


			if(/^[\-0-9]+$/.test(data) ){  //unix format
				m=moment(data, 'X');
			} else if(strdate){ // natural format
				m=moment(strdate[1]+" "+strdate[2]+","+strdate[3]);
			}
			
			if(m && m.isValid()) {
				var unix= m.unix();
				var natural=m.format("MMMM DD, YYYY");
				answer = {"unix":unix, "natural": natural};
			}
			res.json(answer);
		});

};
