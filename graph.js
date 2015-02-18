var LOG_FILE_ = 'log.txt';
Object.defineProperty(global, '__stack', {
get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
get: function() {
        return __stack[2].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
get: function() {
        return __stack[2].getFunctionName();
    }
});

function foo() {
    console.log(__line);
    console.log(__function);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// Logger Class
//////////////////////////////////////////////////////////////////////////////////////////////////
function Logger(logFile){
	var _log = logFile;
	var _fs = require('fs');
	Logger.prototype.log = function(str){
		if( _log == undefined ){
			//console.log( '[' + __function + ':' + __line + ']' );
			//console.log('-----------------------------------------------------------');
			console.log(str);
			//console.log('-----------------------------------------------------------');
		} else {
			var addStr = /*) '-----------------------------------------------------------\n' + */
					     str /* + 
						 '\n-----------------------------------------------------------'*/;
			fs.appendFile( _log, addStr, function(err){
				console.log('[Log]Cannot write log file!');
			})
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// Node Class
//////////////////////////////////////////////////////////////////////////////////////////////////
function Node(nodeName) {
	this._name = nodeName;
	this._neighbours = [];
	var _self = this;
	var _logger = new Logger();
	//console.log('cname:' + this._name);
	// add neighbour to node
	this.addNeighbour = function(node) {

		if (_self._neighbours.some(function(element, index, array) {
						if (node._name == element._name) {
				return true;
			}
		}) == false) {
			//_logger.log('adding neighbour : ' + JSON.stringify( node, undefined, 4) );
			_self._neighbours.push(node);
			result = true;
		}
		return result;
	}

	// remove neighbour from node
	this.removeNeighbour = function(node) {
		return _neighbours.some(function(element, index, array) {
			if (node._name == element._name) {
				array.splice(index, 1);
				return true;
			}
		});
	}

	// visit all nodes neighbours
	this.visitNeighbours = function(callback) {
		result = false;
		if (_neighbours.length > 0) {
			result = _neighbours.some(function(element, index, array) {
				//_logger.log('[visitNeighbours] visiting element with name ' + element.name);
				return callback(element);
			});
		}
		//_logger.log('[visitNeighbours]Returning ' + result);
		return result;
	}

	// get
	this.getNeighbours = function(){
		return _neighbours;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// Graph Class
//////////////////////////////////////////////////////////////////////////////////////////////////
function Graph(graphName) {
	this._name = graphName;
	this._nodes = {};
	var _self = this;
	var _logger = new Logger();
	// add <node> to graph
	this.addNode = function(nodeName) {
		var result = false;
		if (!(nodeName in _self._nodes)) {
			_self._nodes[nodeName] = new Node(nodeName);
			//_log('type: ' + typeof _nodes[nodeName] + ' name: ' + _nodes[nodeName]._name );
			result = true;
		}
		return result;
	}

	// remove <nodeName> from the graph
	// also remove <nodeName> from the neighbour lists of other nodes
	this.removeNode = function(nodeName) {
		var node = _self._nodes[nodeName];
		var result = false;
		if (node != undefined) {
			for (var property in _self._nodes) {			
				self._nodes[property].removeNeighbour(node);
			}
			delete _self._nodes[nodeName];
			result = true;
		}
		return result;
	}

	// add edge <left> -> <right>
	this.addEdge = function(left, right, create) {
		var result = false;
		var leftNode = _self._nodes[left],
		rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			//_logger.log('internal add edge: ' + JSON.stringify(left, undefined, 4) + '-' + JSON.stringify(right, undefined, 4));
			result = leftNode.addNeighbour(rightNode);
			// return here to avoid adding again
			return result;
		}
		if( create ){
			if( leftNode === undefined ){
				//_logger.log('left');
				self._nodes[left] = new Node(left);
				
			} else if(rightNode === undefined){
				//_logger.log('right');
				_self._nodes[right] = new Node(right);
			}
			//_logger.log('internal add edge with create: ' + JSON.stringify(_nodes[left], undefined, 4) + '-' + JSON.stringify(_nodes[right], undefined, 4));
			result = _self._nodes[left].addNeighbour(_self._nodes[right]);			
		}		
		return result;
	}

	// delete edge between <left> -> <right>
	this.removeEdge = function(left, right) {
		var result = false;
		var leftNode = _self._nodes[left];
		var rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			leftNode.removeNeighbour(rightNode);
			result = true;
		}
		return result;
	}

	// returns true if there is an edge between <left> -> <right>
	this.adjacent = function(left, right) {
		var result = false;
		var leftNode = _self._nodes[left],
		rightNode = _self._nodes[right];
		if (leftNode != undefined && rightNode != undefined) {
			leftNode.visitNeighbours(function(element) {
				if (element._name == rightNode._name) {
					result = true;
				}
			});
		}
		return result;
	}

	// print all neighours for <node>
	this.neighbours = function(nodeName) {
		var result = false;
		if( _self._nodes === undefined ){
			_logger.log('Graph internal error');
			return;
		}
		var node = _self.nodes[nodeName];
		if (node != undefined) {
			var text = ''
			node.visitNeighbours(function(element) {
				text += element._name + ', ';
			});
			// ugly text.length-2 cand text e gol
			//_logger.log('obj: ' + JSON.stringify(_nodes[nodeName], undefined, 4) + ' type: ' + typeof _nodes[nodeName] );
			_logger.log(nodeName + ' : [' + text.substring(0, text.length - 2) + ']');
			result = true;
		}
		return result;
	}

	// print all nodes from graph
	this.nodes = function() {
		var printText = '';
		for (var property in _self._nodes) {
			printText += property;
			printText += ' ';
		}
		_logger.log(printText);
	}

	// returns the node object for <nodeName>
	this._getNode = function(nodeName) {
		return _self._nodes[nodeName];
	}

	// generic visit method for nodes;
	this.visit = function(node, callback) {
		if (node in _nodes) {
			callback(self._nodes[node]);
		}
	}

	// prints the entire graph: nodes & node neighboursl
	this.printGraph = function() {
		_logger.log('***************************************************');
		_logger.log('Graph ' + this._name + ':');
		for (var property in _self._nodes) {
				this.neighbours(property);
		}
		_logger.log('***************************************************');
	}
}

module.exports.graph = Graph;
module.exports.logger = Logger;
