const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('---Yoan--')
  next()
}

module.exports = logger
