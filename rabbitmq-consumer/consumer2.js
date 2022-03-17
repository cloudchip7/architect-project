var amqp = require('amqplib/callback_api');

var count = 0;

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

    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function(msg) {
        const item = JSON.parse(msg.content.toString());

        if(item.reset == true) { 
            count = 0;
            console.log(`reset` );
            return;
        }
        // console.log(`Recv ${item.id}`);
        if(item.id == count) { 
            count++;
        }
        else {
            console.log(`error id: ${item.id} count: ${count}` );
        }

        if(item.id % 100 === 0) { 
            console.log(`received id: ${item.id}`);
        }
      }, {
        noAck: true
      });
    });
  });
});