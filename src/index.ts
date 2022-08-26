import net from 'net'
import cfg from './../config.json'
import BakaDB from './bakadb'

const log = console.log
const server = net.createServer()

server.listen( cfg.port, () => {
	log( `Listening on: ${cfg.port}` )
})

server.on( 'connection', socket => {
    let data = ''
    const timeout = setTimeout( () => {
        socket.destroy()
    }, cfg.connectionTimeout * 1e3 )

    socket.on( 'data', chunk => data += chunk )
    socket.on( 'end', () => {
        log( `[SERVER] socket sent: ${data}` )
        clearTimeout( timeout )
    })

})

const bakadb = new BakaDB()
bakadb.set( 'a/b/c', 123 )

//////// tester ////

const socket = net.connect( cfg.port, 'localhost' )

socket.on( 'connect', async () => {
    log( `[CLIENT] connection established` )
    
    socket.write( 'HELLO SERVER' )
    socket.end()
})

socket.on( 'close', () => {
    log( `[CLIENT] the connection closed` )
})
