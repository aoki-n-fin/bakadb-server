/* eslint-disable */

const path = require('path')

console.log(process.env)

function merge(object1, object2)
{
	for (const key in object2)
		if (object1[key] && typeof object2[key] === 'object')
			merge(object1[key], object2[key])
		else
			object1[key] = object2[key]
  
	return object1
}

let global = { }
let local = { }

try
{
	global = require(
		path.join(process.cwd(), '.eslintrc.global.json')
	)
}
catch
{ }

try
{
	local = require(
		path.join(process.cwd(), '.eslintrc.local.json')
	)
}
catch
{ }


module.exports = merge(global, local)
