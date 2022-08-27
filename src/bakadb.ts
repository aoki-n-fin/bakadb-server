import { set, get } from 'lodash'
import print from '@/print-table'

interface Value {
	value: any
}

type Entity = { [key: string]: Entity } | Value

class BakaDB 
{
	private db: Entity = {}

	constructor( path = './bdb' )
	{
		// todo
		console.log( 'bakadb construction' )

		setInterval( () => 
		{
			console.clear()
			console.log( 'db: ' + print( this.db ) )
		}, 1337 )
	}

	set( path: string, value: any )
	{
		set( this.db, path.replace( /\/+/g, '.' ), value )
	}
	
	get( path: string, fallback: unknown )
	{
		return get( this.db, path.replace( /\/+/g, '.' ), fallback )
	}
}

export default BakaDB
