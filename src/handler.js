import { parse } from 'node:url'

const allRoutes = {
	'/heroes:get': (request, response) => {
		response.write('GET')
		response.end()
	},

	// 404 routes
	default: (request, response) => {
		response.writeHead(404, { 'content-type': 'application/json' })
		response.write('not found')
		response.end()
	}
}

function handler(request, response) {
	const {
		url,
		method
	} = request

	const {
		pathname
	} = parse(url, true)

	const key = `${pathname}:${method.toLowerCase()}`
	const chosen = allRoutes[key] || allRoutes.default
	return chosen(request, response)
}

export default handler
