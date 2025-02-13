/*\
title: $:/core/modules/commands/save.js
type: application/javascript
module-type: command

Saves individual tiddlers in their raw text or binary format to the specified files

\*/
(function(){

  <<<<<<< logging-improvements
/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
	name: "save",
	synchronous: true
};

var Command = function(params,commander,callback) {
	this.params = params;
	this.commander = commander;
	this.callback = callback;
};

Command.prototype.execute = function() {
	if(this.params.length < 1) {
		return "Missing filename filter";
	}
	var self = this,
		fs = require("fs"),
		path = require("path"),
		wiki = this.commander.wiki,
		tiddlerFilter = this.params[0],
		filenameFilter = this.params[1] || "[is[tiddler]]",
		tiddlers = wiki.filterTiddlers(tiddlerFilter);
	$tw.utils.each(tiddlers,function(title) {
		var tiddler = self.commander.wiki.getTiddler(title),
			type = tiddler.fields.type || "text/vnd.tiddlywiki",
			contentTypeInfo = $tw.config.contentTypeInfo[type] || {encoding: "utf8"},
			filepath = path.resolve(self.commander.outputPath,wiki.filterTiddlers(filenameFilter,$tw.rootWidget,wiki.makeTiddlerIterator([title]))[0]);
		if(self.commander.verbose) {
			self.commander.log("Saving \"" + title + "\" to \"" + filepath + "\"");
  =======
	/*jslint node: true, browser: true */
	/*global $tw: false */
	"use strict";
	
	exports.info = {
		name: "save",
		synchronous: true
	};
	
	var Command = function(params,commander,callback) {
		this.params = params;
		this.commander = commander;
		this.callback = callback;
	};
	
	Command.prototype.execute = function() {
		if(this.params.length < 1) {
			return "Missing filename filter";
  >>>>>>> wikitext-via-macros
		}
		var self = this,
			fs = require("fs"),
			path = require("path"),
			result = null,
			wiki = this.commander.wiki,
			tiddlerFilter = this.params[0],
			filenameFilter = this.params[1] || "[is[tiddler]]",
			tiddlers = wiki.filterTiddlers(tiddlerFilter);
		$tw.utils.each(tiddlers,function(title) {
			if(!result) {
				var tiddler = self.commander.wiki.getTiddler(title);
				if(tiddler) {
					var fileInfo = $tw.utils.generateTiddlerFileInfo(tiddler,{
						directory: path.resolve(self.commander.outputPath),
						pathFilters: [filenameFilter],
						wiki: wiki,
						fileInfo: {}
					});
					if(self.commander.verbose) {
						console.log("Saving \"" + title + "\" to \"" + fileInfo.filepath + "\"");
					}
					try {
						$tw.utils.saveTiddlerToFileSync(tiddler,fileInfo);
					} catch (err) {
						result = "Error saving tiddler \"" + title + "\", to file: \"" + fileInfo.filepath + "\"";
					}
				} else {
					result = "Tiddler '" + title + "' not found";
				}
			}
		});
		return result;
	};
	
	exports.Command = Command;
	
	})();
	