var Graph = require('./graph').graph;
var Logger = require('./graph').logger;
var internalParser = require('esprima');
var traverser = require('estraverse');
var fs = require('fs');

//////////////////////////////////////////////////////////////////////////////////////////////////
// Parser Class
//////////////////////////////////////////////////////////////////////////////////////////////////
function CParser(graphName) {
	this._parsedJSONs = [];
	this._graph = new Graph(graphName);
	var _self = this;
	this._logger = new Logger();
	// test esprima
	// _logger.log(JSON.stringify(this._internalParser.parse('var answer=22'), null, 4 ) );

	this.parseJS = function(files) {
		files.forEach(function(file) {
			var fs = require('fs');
			var code = fs.readFileSync(file, 'utf8');
			var pJson = internalParser.parse(code);
			_self._parsedJSONs.push({
				file: file,
				json: pJson
			})
		});
	};

	this.print = function() {
		_self._parsedJSONs.forEach(function(element) {
			_self._logger.log('-------------' + element.file + '-------------');
			_self._logger.log(JSON.stringify(element.json, undefined, 4));
		});
	};

	this.functionDeclarations = function() {
		_self._parsedJSONs.forEach(function(item) {
			_self.getFunctionDeclarations(item.json);
		})
	};

	this.getFunctionDeclarations = function(ast) {
		_self._traverser.traverse(ast, {
			enter: function(node) {
				if (node.type == 'FunctionDeclaration') {
					_self._logger.log('Function declaration with name : ' + JSON.stringify(node, undefined, 4));
				}
			}
		});
	};

	this.parseFunctionDeclarations = function() {
		_self._graph = new Graph('HelloGraph');
		_self._parsedJSONs.forEach(function(ast) {			
			traverser.traverse(ast.json, {
				enter: function(node) {
					if( node.type === 'FunctionDeclaration' || node.type === 'Program' ){
					//	_logger.log( 'fd: ' + JSON.stringify( node, undefined, 4));
						var nodeName = '';
						if( node.type === 'FunctionDeclaration'){
							nodeName = node.id.name;
						}else {
							nodeName = ast.file + 'Main';
						}					
						_self._graph.addNode(nodeName);
						var functionNames = [];
						functionNames.push(nodeName);
						//g.printGraph();
						traverser.traverse(node, {
							enter: function(innerNode, parent){						
								if(innerNode.type == 'CallExpression'){									
									//_logger.log('innerNode: ' + JSON.stringify(innerNode, undefined, 4));
									var args = '', result;
									for( var i = 0; i < innerNode.arguments.length; i++ ) {
										args += innerNode.arguments[i].name + ' ';
									}
									switch(innerNode.callee.type) {
									case 'Identifier':														
										result = _self._graph.addEdge(functionNames[functionNames.length - 1], innerNode.callee.name, true);
										//self._logger.log('Adding edge: ' + node.id.name + ' - ' + innerNode.callee.name + ' Result: ' + result);
										//_logger.log('[' + node.id.name + ']Function call to: ' + innerNode.callee.name + ' arguments: ' + args);					
										break;
									case 'MemberExpression':							
										result = _self._graph.addEdge(functionNames[functionNames.length - 1], innerNode.callee.object.name + '.' + innerNode.callee.property.name, true);
										//self._logger.log('Adding edge: ' + node.id.name + ' - ' +  innerNode.callee.object.name + '.' + innerNode.callee.property.name +  ' Result: ' + result );
										//_logger.log('[' + node.id.name + ']function call to ' + innerNode.callee.object.name + '.' + innerNode.callee.property.name + ' arguments: ' + args );										
										break;
									default:
										_self._logger.log('default');
									}
								} 
								if(innerNode.type === 'FunctionDeclaration') {
									functionNames.push(innerNode.id.name);
								}
							},
							leave: function(innerNode, parent){
								if(innerNode.type === 'FunctionDeclaration'){
									functionNames.pop();
								}
							} 
						});
					}
				}
			});
		_self._graph.printGraph();
		});
	};

	this.exportGraph = function(outFile){
		var cache = [];
		console.log(this._graph);
		var str = JSON.stringify(
			this._graph, 
			function(key, value) {
				var toRet = '';
				if(typeof value == 'object' && value !== null && key == '_neighbours' && value.length > 0 ){					
					value.forEach(function(element){
						toRet += element._name + ', ';
					});

					toRet = toRet.substring(0, toRet.length - 2);
					return toRet;
				}
				return value;
			},
			4);
		console.log('writing : ' + str);
		fs.writeFile(outFile, str, function(err){
			if(err){
				_self._logger.log('Error when exporting graph to file!' + err);
			} else {
				_self._logger.log('Success');
			}
		});
	}
}

module.exports = CParser;
