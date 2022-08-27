import { time } from 'console'
import net from 'net'
import cfg from './../config.json'
import BakaDB from './bakadb'
import LoggerDebugger from './logger-debugger'

export const logger = new LoggerDebugger()
const sleep = timeout => new Promise( resolve => setTimeout( resolve, timeout * 1e3 ) )
const server = net.createServer()

server.listen( cfg.port, () => {
	logger.log( `Listening on: ${cfg.port}` )
})

server.on( 'connection', socket => {
    let data = ''
    const timeout = setTimeout( () => {
        socket.destroy()
    }, cfg.connectionTimeout * 1e3 )

    socket.on( 'data', chunk => data += chunk )
    socket.on( 'end', () => {
        logger.log( `[SERVER] socket sent: ${data}` )
        clearTimeout( timeout )
    })

})