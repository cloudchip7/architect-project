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

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            const item = JSON.parse(msg.content.toString());

            console.log(`Recv ${item.id}`);
            // if(item.id == count) { 
            //     count++;
            // }
            // else {
            //     console.log(`error id: ${item.id} count: ${count}` );
            // }
        }, {
            noAck: true
        });
    });
});