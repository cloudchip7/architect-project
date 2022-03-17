var amqp = require('amqplib/callback_api');

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
    
    let msg = { id: 0, reset: true };
    channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});