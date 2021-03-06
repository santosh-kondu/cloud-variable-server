var socket = require('socket.io-client')('http://localhost:8001');
var tty = require('tty')

var i =0;

socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

socket.on('variable_changed', function(msg){
    console.log("VAR CHANGED ",msg)

})

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
        process.exit();
    }

    socket.emit('variable_changed',{
        variable_name: 48904,
        namespace: 16841,
        value: i.toString(),
        appId: 0x1234,
        uid: Math.round(Math.random()*65535)
    })
    i++
});