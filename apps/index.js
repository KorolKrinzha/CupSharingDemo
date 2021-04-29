const ShowPorts = function (port1, port2, port3) {
  if (port1 == 0) port1="unknown"
  if (port2 == 0) port2="unknown"
  if (port3 == 0) port3="unknown"
    return `{'Port1:' ${port1}, 'Port2:' ${port2}, 'Port3': ${port3}}`
  }

const ErrorCode = function(req, res){
    res.writeHead(404, {'Content-Type':'text/html'})
    res.end('<h1 style="color:red">Error</h1>')
}  

const ErrorCodeDB = function(req, res){
  res.writeHead(404, {'Content-Type':'text/html'})
  res.end('Error updating db')
}  


 exports.ShowPorts = ShowPorts;
 exports.ErrorCode = ErrorCode;
 exports.ErrorCodeDB = ErrorCodeDB;