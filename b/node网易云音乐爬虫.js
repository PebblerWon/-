var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

//爬虫爬取的地址
var HOST = "http://music.163.com/#/discover/playlist/";
var URLParamer = "?order=hot&cat=%E5%85%A8%E9%83%A8&limit=35&offset=";
var PageSize = 35; //每页显示35个歌单



//总共爬取100页
for(var i = 0; i < 1; i++){
	URLParamer += PageSize*i;
	var URL = HOST+URLParamer; 
	http.get("http://music.163.com/#/discover/playlist",(res)=>{
		var html = '';
		res.on('data',(data)=>{
			html+=data;
		});

		res.on('end',()=>{
			var a = filterChapters(html);
		})
	}).on('error',(e)=>{
		console.log('Got error'+e);
	})
}

//处理爬到的字符串
function filterChapters(html){
	//储存爬到的歌曲
	var musicLists=[];
	fs.writeFile('abc.txt',html,function(err){
		if(err){
			console.log(err);
		}
		console.log('写入成功！');
	})
	
	
}
