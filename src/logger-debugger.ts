
export default class LoggerDebugger 
{
	public logLimit = 10

	public evaluations: Map<string, () => string> = new Map()
	
	private interval: NodeJS.Timer

	private logs: string[] = Array( this.logLimit ).fill( '' )

	constructor()
	{
		this.interval = setInterval( () => this.updateLog(), 1337 )
	}

	log( ...log: any[] )
	{
		this.logs.push( log
			.map( v => String(v) )
			.join( ' ' )
		)
		this.logs.shift()
		this.updateLog()
	}

	updateLog()
	{
		console.clear()

		console.log( 'log:' )
		this.logs.forEach( log => console.log( ' - ' + log ) )

		console.log( '\nevaluations:' )
		this.evaluations.forEach( ( e, k ) => console.log( `${k}: ${e()}` ) )
	}
	
	destroy()
	{
		clearInterval( this.interval )
	}
}
