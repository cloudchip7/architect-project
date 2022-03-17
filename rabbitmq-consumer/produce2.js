
var amqp = require('amqplib/callback_api');
const fr = require('./fileRead.js');

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

        const text = fr.readTextFile("./data.txt");
        let msg = { id:1, msg: text };

        for(let i = 0; i < 10; i++) { 
            msg.id = i;
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
        }
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});

