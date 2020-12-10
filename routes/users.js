exports.getUsers = function(req,res) {
  console.log("Item Users");

  res.writeHead(200,{"Content-Type":"application/json"})
  var result={result:true};
  res.write(JSON.stringify(result));
  res.end();
}