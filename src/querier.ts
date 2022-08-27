import { logger } from ".";
import BakaDB from "./bakadb";

export default class Querier {
	private bakadb: BakaDB

	private methods = {
		get: args => {
			return this.bakadb.get( args[0] )
		},
		set: args => {
			this.bakadb.set( args[0], args[1] )
		},
		delete: args => {
			this.bakadb.delete( args[0] )
		},
	}

	constructor( bakadb: BakaDB ){
		this.bakadb = bakadb
	}

	eval( query: string ): string | undefined {
		const args = this._parseArgs( query )
		const methodName = args.shift()?.toLowerCase()

		if( !methodName )
			return

		const method = this.methods[methodName]
		const result = method ? method( args ) : undefined

		logger.log( `[QUERY] ${methodName}( ${args.join( ', ' )} ) := ${result}` )
		return result
	}

	private _parseArgs( string: string ): string[] {
		let args: string[] = []
		let quotes = ''
		let arg = ''
		let pos = 0

		for( let i = 0; i < string.length; ++i ){
			let char = string[i]

			if( !quotes && /\s/.test( char ) ){
				if( arg ){
					args.push( arg )
					arg = ''
				}
			} else {
				if( quotes ){
					if( char == quotes ){
						args.push( arg )
						arg = ''
						quotes = ''
						continue
					}
				} else {
					 if( char == '"' || char == "'" ){
						quotes = char
						pos = i
						continue
					}
				}

				if( !arg && !quotes )
					pos = i

				arg += char
			}
		}

		if( arg )
			args.push( arg )

		return args
	}
}