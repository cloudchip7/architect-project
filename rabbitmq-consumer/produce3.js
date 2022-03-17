var amqp = require('amqplib/callback_api');
const fr = require('./fileRead.js');

const data = 2100;

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'logs';
 
    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    
    const text = fr.readTextFile("./data.txt");
    let msg = { id:1, reset: false, msg: text };

    for(let i = 0; i < data; i++) { 
        msg.id = i;
        const ret = channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)), {}, function(err,or){ 
          console.log("호출되는지");
        });

        if(ret === false)
        { 
          console.log(`send ${msg.id}`);
        }
    }
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});