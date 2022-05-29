// JavaScript Document

//send info to movie info page:
//sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));

var movieInfo;

var div_movie_img;
var div_movie_title;
var div_movie_year;
var div_movie_rating;
var div_movie_votes;
var div_movie_likeNum;
var button_movie_like;

$(document).ready(function(){
	movieInfo = JSON.parse(sessionStorage.getItem("showMovieBasicInfo"));
	
	div_movie_img = document.querySelector('#div_movie_img');
	div_movie_title = document.querySelector('#div_movie_title');
	div_movie_year = document.querySelector('#div_movie_year');
	div_movie_rating = document.querySelector('#div_movie_rating');
	div_movie_votes = document.querySelector('#div_movie_votes');
	div_movie_likeNum = document.querySelector('#div_movie_likeNum');
	
	updateMovieInfo();
	quaryMovieInfo(movieInfo.movieId);
	
});

function updateMovieInfo()
{
	if(movieInfo!==null)
	{
		console.log(movieInfo);
		setMovieImg(div_movie_img,movieInfo.title);
		div_movie_title.textContent = "Title: "+movieInfo.title;
		div_movie_year.textContent = "Tear: "+movieInfo.year;
		div_movie_rating.textContent = "Rating: "+movieInfo.rating;
		div_movie_votes.textContent = "Number of votes :"+movieInfo.votes;
		div_movie_likeNum.textContent = "Number of likes: "+movieInfo.likes;
		if(movieInfo.likes<0)
		{
			div_movie_likeNum.textContent = "Number of likes: Null";
		}
		
	}
}

function quaryMovieInfo(id){
	console.log("start quary movie ["+id+"]");
	$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/movieInfo',
		type:'post',
		data:{
			Id:id
		},
		dataType: 'text',
		success: function(data){
			console.log("post success");
			movieInfo = JSON.parse(data);
			updateMovieInfo();
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
}

function setMovieImg(element,title){
	var src = "./img/moviePhoto.png";
	var maxCheckNum = 1;
	$.ajax({
		url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+title,
		type:'get',
		dataType: 'json',
		async: false,
		success: function(data){
			/*console.log("search image successfully!!!!"+JSON.stringify(data));*/
			var poster_path = "null";
			var result = data.results;
			var checkNum = Math.min(result.length,maxCheckNum);
			
			for(var i = 0; i < checkNum; i++) {
				var info = JSON.stringify(data.results[i].poster_path);
				if (info!=="null")
				{
					poster_path = info;
					break;
				}
			}
			console.log(title);
			console.log(data.results);
			if(poster_path!=="null")
			{
				var imgSrc = "https://image.tmdb.org/t/p/w500"+poster_path;
				src  = imgSrc.replaceAll('"','');
			}
			/*console.log("src:"+src);*/
			element.style.backgroundImage = "url("+src+")";
			element.style.backgroundSize = "100% 100%";
		},
		error: function()
		{
			console.log("search image failed");
		}		
	});
};