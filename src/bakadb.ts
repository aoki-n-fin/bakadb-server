import print from './print-table'
import Querier from './querier'
import { logger } from './index'

interface Value {
	value: string
}

type Entity = { [key: string]: Entity } | Value

function resolvePath( path: string[] ){
	return path
		.map( e => e.toString().split( /[\/\.]+/ ) )
		.flat(1)
		.filter( e => !!e )
}

class BakaDB {
	private db: Entity = {}
	public readonly querier = new Querier( this )

	constructor( path: string = './bdb' ){
		// todo
		logger.log( 'bakadb construction' )
		logger.evaluations.set( 'db', () => print( this.db ) )
	}
	
	get( ...path: string[] ){
		let value = this.db
		path = resolvePath( path )

		for( let i = 0; i < path.length; ++i ){
			let prop = path[i]
			if( !prop ) continue

			if( typeof value[prop] === 'undefined' )
				return

			value = value[prop]
		}

		if( value === this.db )
			return

		return value
	}

	set( ...path: string[] ){
		let value = path.pop()
		let object = this.db
		path = resolvePath( path )

		let key = path.pop()
		
		if( !key )
			return

		for( let i = 0; i < path.length; ++i ){
			let prop = path[i]
			if( !prop ) continue

			if( typeof object[prop] === 'undefined' )
				object[prop] = {}

			object = object[prop]
		}

		object[key] = value
	}

	delete( ...path: string[] ){
		this._delete( this.db, resolvePath( path ) )
	}

	private _delete( object: Entity, path: string[] ){
		if( path.length === 0 )
			return false

		let key = path.shift()!

		if( typeof object[key] !== 'undefined' ){
			if( path.length === 0 )
				delete object[key]
			else {
				if( this._delete( object[key], path ) )
					delete object[key]
			}
		}

		return Object.keys( object ).length === 0
	}
}

export default BakaDB