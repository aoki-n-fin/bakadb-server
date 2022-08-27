
const __duplicates = new Set()
let __maxDepth = 4

function* iterateUniterable( object )
{
	for( const key in object )
		yield [ key, object[key] ]
}

export default function printTable( v: any, maxDepth = 4 ): string 
{
	__maxDepth = maxDepth
	const s = _printTable(v)
	__duplicates.clear()
	return s
}

function _printTable( v, depth = 0 )
{
	if( v == null )
		return String(v)

	if( typeof v !== 'object' )
	{
		if( typeof v === 'string' )
			return `"${v}"`

		if( typeof v === 'number' || typeof v === 'boolean' )
			return String(v)

		return `${v.constructor.name}(${String(v)})`
	}

	if( __duplicates.has(v) )
		return `Duplicate of ${v.constructor.name}`

	__duplicates.add(v)
	++depth

	//if( v instanceof Vector )
	//	return `${v.constructor.name} ${v}`

	if( v instanceof Set )
	{
		const iter = v.values()
		let values = _printTable( iter.next().value, Infinity )
		
		for( const value of iter )
			values += ', ' + _printTable( value, Infinity )
		
		return `Set [${values}]`
	}

	const isArray = v instanceof Array
	const isIterable = typeof v[Symbol.iterator] === 'function'

	const iter = isArray || !isIterable
		? iterateUniterable(v)
		: v[Symbol.iterator]()
	
	const size = isIterable && !isArray
		? v.size
		: Object.keys(v).length

	const content = size === 0
		? '<empty>'
		: depth > __maxDepth
			? `<${size ?? 'unknown amount of'} item${size === 1 ? '' : 's'}${isArray && v.length !== size ? `; ${v.length} length` : ''}>`
			: '\n' + Array.from( iter, ([ k, v ]) => 
			{
				v = _printTable( v, depth ).replace( /\n/gm, '\n\t' )
				return `\t${k}: ${v}`
			}).join( '\n' ) + '\n'
	
	return `${v.constructor.name} ${isArray || isIterable ? `[${content}]` : `{${content}}`}`
}
