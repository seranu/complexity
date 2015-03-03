var module_ = require('../src/graph.js');
var Graph = module_.graph;
var Node  = module_.node;

exports.testNodeAddNeighbour = function(test){
	var node = new Node('addNeighbourNode');
	var neighbour = new Node('neighbour');
	var compare = neighbour;
	var anotherNeighbour = new Node('anotherNeighbour');
	var findCallback = function(element){
		if(element === compare){
			return true;
		}
		return false;
	}
	test.equal(true, node.addNeighbour(neighbour));	
	test.equal(true, node.visitNeighbours(findCallback));
	test.equal(true, node.addNeighbour(anotherNeighbour));
	test.equal(true, neighbour.addNeighbour(anotherNeighbour));
	compare = anotherNeighbour;
	test.equal(true, node.visitNeighbours(findCallback));
	test.equal(true, neighbour.visitNeighbours(findCallback));
	test.done();
}

exports.testGraphAddNode = function(test){
	var g = new Graph('addNodeGraph');
	test.equal(true, g.addNode('node'));
	test.equal(true, g.getNode('node') !== undefined);
	test.done();
}

exports.testGraphRemoveNode = function(test){
	var g = new Graph('testRemoveNode');
	test.equal(true, g.addNode('node'));
	test.equal(true, g.addNode('anotherNode'))
	test.equal(true, g.getNode('node') !== undefined);
	test.equal(true, g.getNode('anotherNode') !== undefined);
	test.equal(true, g.removeNode('node'));
	test.equal(true, g.getNode('anotherNode') !== undefined);
	test.equal(true, g.getNode('node') === undefined);
	test.done();
}
