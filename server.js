// Require express and then make express object
var express = require('express');
var app = express();

// Require body-parser and create json parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Create a storage template
var Storage = function() {
	this.items = [];
	this.id = 0;
}

// Add a method to the Storage template
Storage.prototype.add = function(name) {
	var item = {name: name, id: this.id};
	this.items.push(item);
	this.id += 1;
	return item;
}

Storage.prototype.delete = function(id) {
	for (var i = 0; i < this.items.length; i++) {
		if(this.items[i].id == id) {
			return this.items.splice(i,1);
		}
	}
}

Storage.prototype.edit = function(obj) {
	for (var i = 0; i < this.items.length; i++) {
		if(this.items[i].id == obj.id) {
			this.items[i] = obj;
			return this.items[i];
		}
	}
}

// Create a new instance of the Storage template
var storage = new Storage();

// Uses the files in the public folder
app.use(express.static('public'));


app.get('/items', function(req, res){
	res.json(storage.items);
	
});

app.post('/items', jsonParser, function(req, res){
	if (!req.body) {
		return res.sendStatus(400);
	}
	var item = storage.add(req.body.name);
	res.status(201).json(item);
});

app.delete('/items/:id', function(req, res){
	if (!req.params){
		return res.sendStatus(400);
	}
	var item = storage.delete(req.params.id);
	res.status(200).json(item);
});

app.put('/items/:id', jsonParser, function(req, res){
	if (!req.body){
		return res.sendStatus(400);
	}
	var item = storage.edit(req.body);
	res.status(200).json(item);
});

app.listen(process.env.PORT || 8080, function(){
	console.log("Server Started at: http://localhost:8080");
});

exports.app = app;
exports.storage = storage;
