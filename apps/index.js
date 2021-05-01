const ErrorCode = function(req, res){
    res.writeHead(404, {'Content-Type':'text/html'})
    res.end('<h1 style="color:red">Error</h1>')
}  

const ErrorCodeDB = function(req, res){
  res.writeHead(404, {'Content-Type':'text/html'})
  res.end('Error updating db')
}  


exports.ErrorCode = ErrorCode;
exports.ErrorCodeDB = ErrorCodeDB;