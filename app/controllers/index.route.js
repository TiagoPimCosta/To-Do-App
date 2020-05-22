const express = require('express');
const router = express.Router();
const lists = require('../models/lists.model');
const items = require('../models/items.model');

router.get('/', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	if(request.isAuthenticated()){
		lists.read(request.user.id_user, function(lists){
			for(let i = 0; i < lists.length; i++){
				items.read(lists[i].id_list, function(items){
					lists[i].items = items;

					if(i == lists.length-1){
						//console.log(lists);
						response.set("Content-Type", "text/html");
						response.render('index', {data: lists})
					}
				});
			};	
		});
	}else{
		response.set("Content-Type", "text/html");
		response.render('index', {})
	}
});

module.exports = router;