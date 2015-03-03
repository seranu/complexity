//////////////////////////////////////////////////////////////////////////////////////////////////
// Node Class
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
function Node(nodeName){
	this._name = nodeName;
	this._neighbours = [];

	// add neighbour to node
	this.addNeighbour = function(node){

		if( this._neighbours.some(function(element, index, array){
			if( node._name == element._name ){
				return true;
			}
		}) == false){
			this._neighbours.push(node);
		}
	}

	// remove neighbour from node
	this.removeNeighbour = function(node){
		return this._neighbours.some(function(element, index, array){
			if( node._name == element._name ){
				array.splice(index, 1);
				return true;
			}
		});
	}

	// visit all nodes neighbours
	this.visitNeighbours = function(callback){
		result = false;
		if( this._neighbours.length > 0 ){
			result = this._neighbours.some( function(element, index, array){
				//console.log('[visitNeighbours] visiting element with name ' + element.name);
				return callback(element);
			});
		}
		//console.log('[visitNeighbours]Returning ' + result);
		return result;
	}
}
var node1 = new Node();
var node2 = new Node();
node1.addNeighbour(node2);
*/

function foo(fooarg){
	console.log(fooarg);
	bar(fooarg);
}

function bar(bararg){
	foo(bararg);	
}

function nar(nararg){
	console.log(nararg);
	bar(nararg);
	foo(nararg);
}

nar(barg);