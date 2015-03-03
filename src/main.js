var parser_ = require('./parser');
var Graph = require('./graph').graph;

var parser = new parser_();
if( process.argv.length < 3 ){
	console.log('Usage: node main.js <input_file> <output_file>!');
	return;
}

var input = process.argv[2];
var output = process.argv[3];

parser.parseJS([input], parser);
parser.print();
//parser.functionDeclarations();
parser.parseFunctionDeclarations();
parser.exportGraph(output);




/*
n1 = new Node('1');
n2 = new Node('2');
n3 = new Node('3');
n4 = 
n1.addNeighbour(n2);
n1.addNeighbour(n3);
n1.addNeighbour(n2);
n2.addNeighbour(n1);
n1.visitNeighbours(function(node){
	_logger.log(node.name);
});*/
//n1.removeNeighbour(n2);
/*
_logger.log('\n');
n1.visitNeighbours(function(node){
	_logger.log(node.name);
});*/

/*n2.visitNeighbours(function(node){
	_logger.log(node.name);
});
*/
//g.nodes();

/*
g = new Graph('main');
g.addNode('1');
g.addNode('2');
g.addNode('3');

console.log("Adjacent: " + g.adjacent( '2', '3') );
g.addEdge('1','2');
g.addEdge('1','3');
g.addEdge('1','6', true);
g.neighbours('1');
g.removeNode('2');
g.neighbours('1');
g.printGraph();
console.log("Adjacent: " + g.adjacent( '2', '3') );
*/