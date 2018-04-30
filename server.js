const net = require('net');
const fs = require('fs');
var host = '127.0.0.1';
var port = 80;

const server = net.createServer(function(socket) { 
    console.log('client connected');

    socket.on('end', function() {
        console.log('client disconnected');
    });

    fs.readFile('index.html', function(err, data) {
        if(err)
        {
            socket.write('HTTP/1.1 404 Not OK, OK?\r\n');
        }
        else
        {
            socket.write('HTTP/1.1 200 OK\r\n');
        }

        socket.write('Host: localhost\r\n');
        socket.write('Connection: do-not-keep-alive-but-kill-on-sight\r\n');
        socket.write('Cache-Control: max-age=9001\r\n');
        socket.write('User-Agent: Mozzarella/5.0 (Ubuntu NT 10.0; kernel64; x64) PearWebKit/537.36 (KHTML, like Axolotl) Chrome/66.0.3359.117 SafariJungle/537.36\r\n');
        socket.write('Accept: no-one\r\n');
        socket.write('Connection-Killed-In-Action: Yes\r\n\r\n');  
        socket.write(data);
        socket.end();
    });
});

server.listen(port, function() { 
    console.log('Server running on ' + host + ':' + port);
});