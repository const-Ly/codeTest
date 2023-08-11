var express = require("express")
var path = require("path")


var app = express()

app.use('/admin', express.static(path.join(__dirname, "admin")))

//设置跨域访问
app.all('*', function(req, res, next) {
	console.log(req.method);
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, Content-Disposition, Accept-Ranges'
	);
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
	res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天

	next();
});

app.get("/image", function(req, res) {
	res.end("image")
})

app.get("/api/getAge", function(req, res) {
	return res.json({
		code: 200,
		age: 26
	})
})

app.get("*", function(req, res) {
	return res.json({
		code: 200,
		name: 'liuyong'
	})
})


app.listen(3001, function() {
	console.log("running");
})