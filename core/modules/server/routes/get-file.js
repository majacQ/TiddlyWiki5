/*\
title: $:/core/modules/server/routes/get-file.js
type: application/javascript
module-type: route

GET /files/:filepath

\*/
(function() {

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.method = "GET";

exports.path = /^\/files\/(.+)$/;

exports.handler = function(request,response,state) {
	var path = require("path"),
		fs = require("fs"),
		util = require("util"),
		suppliedFilename = decodeURIComponent(state.params[0]),
  <<<<<<< allow-filter-duplicates
		filename = path.resolve($tw.boot.wikiPath,"files",suppliedFilename),
  =======
		filename = path.resolve(state.boot.wikiPath,"files",suppliedFilename),
  >>>>>>> new-json-store-area
		extension = path.extname(filename);
	fs.readFile(filename,function(err,content) {
		var status,content,type = "text/plain";
		if(err) {
			console.log("Error accessing file " + filename + ": " + err.toString());
			status = 404;
			content = "File '" + suppliedFilename + "' not found";
		} else {
			status = 200;
			content = content;
			type = ($tw.config.fileExtensionInfo[extension] ? $tw.config.fileExtensionInfo[extension].type : "application/octet-stream");
		}
		state.sendResponse(status,{"Content-Type": type},content);
	});
};

}());
