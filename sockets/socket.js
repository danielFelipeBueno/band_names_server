const { io } = require('../index')
//% Sockets Message
io.on('connection', client => {
    console.log('Cliente conectado: ');
    client.on('disconnect', () => {
        console.log('Disconect Client')
    });
    client.on('message', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit('message', { admin: 'Nuevo Mensaje'});
    });
});
