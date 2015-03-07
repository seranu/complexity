var module_ = require('../src/graph.js');
var Graph = module_.graph;
var Node  = module_.node;

var g = new Graph('testAddEdge');
console.log( ' add node ' + g.addNode('node'));
console.log( ' add node ' + g.addNode('anotherNode'));
console.log( ' add edge ' + g.addEdge('node', 'anotherNode'));
console.log( ' add edge ' + g.addEdge('node', 'newNode'));
console.log( ' add edge ' + g.addEdge('node', 'newNode', true));
console.log( 'result = \"' + g.neighbours('node') + '\"' );
// g.neighbours('node') === '[anotherNode, newNode]');



