var zonar = require('zonar');
var helper = require("service.helper");
var zmq = require('zmq');

var config = require('rc')('proximity', {
    servicePort: 6060,
    proximitySensorId: "green"
});

var doc = helper.createDoc({ filename : "README.md"});
var z = zonar.create({
    net : "24hr",
    name : "proximity-" + config.proximitySensorId,
    payload : {
        doc : doc.getPayload(),
        reading : {
            type : "pub",
            port : config.servicePort
        }
    }
});

var pubsock = zmq.socket("pub");

pubsock.bindSync("tcp://*:" + config.servicePort);

z.start(function(){

    console.log("started");
});

helper.handleInterrupt(z);

var Bleacon = require('bleacon');           

Bleacon.startScanning(); 

Bleacon.on('discover', function(bleacon) { 
    //console.log(bleacon.uuid);
    pubsock.send("IBEACON " + JSON.stringify(bleacon));
}); 
