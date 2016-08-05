var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('Shopping List', function() {
    it('should list items on get', function(done){
    	chai.request(app)
    	.get('/items')
    	.end(function(err, res){
    		res.should.have.status(200);
            res.should.be.json;
            done();
            console.log(storage.items);
    	});
    });
    it('should add an item on post', function(done){
        chai.request(app)
        .post('/items')
        .send({'name': 'Kale'})
        .end(function(err, res){
            should.equal(err, null);
            res.should.have.status(201);
            res.should.be.json;
            res.body.id.should.be.a('number');
            storage.items[0].name.should.equal('Kale');
            done();
            console.log(storage.items);
        });
    });
    it('should edit an item on put',function(done){
        chai.request(app)
        .put('/items/0')
        .send({'name': 'Cucumber', 'id': 0})
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            storage.items[0].name.should.equal('Cucumber');
            done();
            console.log(storage.items);
        });
    });
    it('should delete an item on delete', function(done){
        chai.request(app)
        .delete('/items/0')
        .send({'name': 'Cucumber'})
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            storage.items.should.be.an('Array');
            storage.items.should.be.empty;
            done();
            console.log(storage.items);
        });

    });
});


