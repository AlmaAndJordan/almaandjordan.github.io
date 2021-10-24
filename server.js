let express = require("express");
let app = express();



// routes


var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + '/'));

// app.use('/api/projects',projectsRoute)






app.listen(port,()=>{
  console.log("Listening on port ", port);
});