var module_ = require('../src/graph.js');
var Graph = module_.graph;
var Node  = module_.node;

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
console.log('Addneigh1: ' + node.addNeighbour(neighbour));	
node.visitNeighbours(findCallback);	
console.log('Addneigh2: ' + node.addNeighbour(anotherNeighbour));
console.log('addneigh3: ' + neighbour.addNeighbour(anotherNeighbour));
compare = anotherNeighbour;
console.log('visit2: ' + node.visitNeighbours(findCallback));
console.log('visit3: ' + neighbour.visitNeighbours(findCallback));


