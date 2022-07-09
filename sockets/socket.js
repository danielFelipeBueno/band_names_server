const { io } = require('../index')
const Band = require('../models/band')
const Bands = require('../models/bands')

const bands = new Bands();

bands.addBand( new Band('Rammstein') );
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Metalica') );
bands.addBand( new Band('Mother Mother') );

console.log(bands);

//% Sockets Message
io.on('connection', client => {
    console.log('Cliente conectado: ');
    client.emit('active-bands', bands.getBands() );
    client.on('disconnect', () => {
        console.log('Disconect Client')
    });
    
    client.on('message', ( payload ) => {
        console.log('Mensaje', payload);
        io.emit('message', { admin: 'Nuevo Mensaje'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name );
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    }); 

    // client.on('emitir-mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     //$ io.emit('nuevo-mensaje', payload); //emite a todos!
    //     client.broadcast.emit('nuevo-mensaje', payload);//$ emite a todos menos al que lo emitio
    // });
});
