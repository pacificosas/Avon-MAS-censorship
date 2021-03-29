var wp=require("./webpack.config")
var path=require("path");

wp.watch= true
wp.mode= "development",
wp.devtool= "inline-source-map",

module.exports=wp