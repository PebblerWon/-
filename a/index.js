var http = require('http')
var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
var i = 0
var url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391'

function fetchPage(url){
	startRequest(url)
}

function startRequest(url){
	http.get(url,function(res){
		var html=''
		var titles=[]
		res.setEncoding('utf-8')
		res.on('data',function(chunk){
			html+=chunk
		})
		res.on('end',function(){
			var $ = cheerio.load(html)
			var time = $('.article-info a:first-child').next().text().trim()
			var news_item = {
          		//获取文章的标题
            	title: $('div.article-title a').text().trim(),
         		//获取文章发布的时间
            	Time: time,   
         		//获取当前文章的url
            	link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
         		//获取供稿单位
            	author: $('[title=供稿]').text().trim(),  
        		//i是用来判断获取了多少篇文章
            	i: i = i + 1, 
            }

            console.log(news_item)
            var news_title = $('div.article-title a').text().trim()
            //savedContent($,news_title)
            savedImg($,news_title)


            /*
			* next 
            */
            var nextLink = "http://www.ss.pku.edu.cn" + $("li.next a").attr('href')
            str1 = nextLink.split('_')
            str = encodeURI(str1[0])
            if(i<=500){
            	fetchPage(str)
            }
		})

		res.on('error',function(err){
			console.err(err)
		})
	})
}

function savedImg($,news_title){
	$('.article-content img').each(function(index,item){
		var img_title = $(this).parent().next().text().trim()
		if(img_title.length>35||img_title==""){
			img_title='null'
		}
		var img_filename = img_title+'.jpg'
		var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src')//获取图片的url
		request.head(img_src,function(err,res,body){
			if(err)console.err(err)
		})
		request(img_src).pipe(fs.createWriteStream('./image/'+news_title+'---'+img_filename))
	})
}

fetchPage(url)