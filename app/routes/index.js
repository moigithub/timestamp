'use strict';
var moment = require('moment');

var path = process.cwd();

module.exports = function (app) {


	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:data')
		.get(function (req, res) {
			//{"unix":1450137600,"natural":"December 15, 2015"
			var data = req.params.data;
			//console.log(req.params.data);
			
			var answer ={"unix":null, "natural":null};
			var m;
			var strdate=/(\w+)\s(\d{1,2}),?(\s?\d{2,4})?/i.exec(data);


			if(/^[\-0-9]+$/.test(data) ){  //unix format
				m=moment(data, 'X');
			} else if(strdate){ // natural format
				var month = strdate[1];
				var day = strdate[2];
				var year = strdate[3] || "";
				m=moment(Date.parse(month+" "+day+" "+year));
				//console.log(strdate);
			}
			
			if(m && m.isValid()) {
				var unix= m.unix();
				var natural=m.format("MMMM DD, YYYY");
				answer = {"unix":unix, "natural": natural};
			}
			res.json(answer);
		});

};
