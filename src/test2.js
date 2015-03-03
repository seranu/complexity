var libamqp = require('nimbus_amqp');
var fs = require('fs');
var count = 0;


var connectInputAmqp = function ( callback )
{
	libamqp.factory(
	{
		heartbeat : 30,
		reconnect_interval : 10,
		host : ['as-mq-legit.devel.nimbus', 'as-mq-legit.devel.nimbus'],
		queues : 
		{
			test_zip_attachements : { prefetch_count : 1, on_message: consumeEML, durable:true, autoDelete:true, bind: { exchange: 'spam_info', routing_key:'bin_for_av'}}
		}
	},

	function(err, a){
		if ( err ){
			callback( err );
		}else{
			console.log('[AMQP] Connected to as-mx-rabbit-01.devel.nimbus/as-mx-rabbit-02.devel.nimbus' );
			callback( null );
		}
	});
}

function consumeEML(msg, headers, deliveryInfo, message)
{
	var emlContent = msg.emailBase64;

	var dc = new Buffer( emlContent, 'base64' );
	if( !fs.existsSync(/*msg.key*/'randomMails') ){
    	fs.mkdir(/*msg.key*/ 'randomMails');
    }

    var fileName = /*msg.key  +*/ 'randomMails/' + id + '.eml';
    id++;  	
    fs.writeFile(fileName, dc, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
    message.acknowledge(true);
  //  sendMail( dc ,msg.key, function(){
  //  	console.log(stats);
  //  	message.acknowledge(false);
  //  });
    
}); 
}
var id =0;
connectInputAmqp( function(){});
