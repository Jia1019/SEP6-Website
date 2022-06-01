// JavaScript Document

var user=sessionStorage.getItem("username");
var psw=sessionStorage.getItem("password");
var movieInfo;

$(document).ready(function(){
	$(".error").css({"padding":"10px","color":"#f24144","font-size":"20px"});
	if (typeof(Storage) !== "undefined") {
	if(user==""||psw==""||user==null||psw==null)
	   {
	    $(".logout").css('display','none');
		   $(".logReg").css('display','block');
	   }
	   else{
		   $(".logout").css('display','block');
		   $(".logReg").css('display','none');
	   }
	}
	else{
		console.log("check browser support failed");
	}
});

$(document).ready(function(){
	
		$("#RegisterConfirm").click(function(){
			var username=$('#RegisterUsername').val().trim();
			var password=$('#RegisterPwd').val().trim();
			
			if(username==null||username==""){
				console.log("null username");
				$(".error").text("Please insert username");
			}
			else if(password==null||password==""){
				console.log("null password");
				$(".error").text("Please insert password");
			}
			else{
				$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-user_account_management/register',
				type:'post',
				data:{
					Account:username,
					Password:password
				},
				//dataType:'JSON',
					/**beforeSend: function(request)
					{
					  request.setRequestHeader("Access-Control-Allow-Origin", "*");
						request.setRequestHeader('Access-Control-Allow-Credentials','true');
					
				},**/
				success: function(data){
					
					if(data=="OK"){
						alert("REGISTER SUCCESSFULLY！");
					$("#myRegisterModal").modal('hide');
					$("#myLoginModal").modal('show');
						$("#RegisterPwd").text("");
						$("#RegisterUsername").text("");
						$(".error").text("");
					}
					else
						{
							$(".error").text(data);
							$("#RegisterPwd").text("");
						$("#RegisterUsername").text("");
						}
					
				},
				error: function()
				{
					console.log("post fail");
				}		
			});
			}
			
	});
	
	
	});
	
	$(document).ready(function(){
	
	 $("#LoginConfirm").click(function(){
			var username=$('#LoginUsername').val().trim();
			var password=$('#LoginPwd').val().trim();
			
		 if(username==null||username==""){
				console.log("null username or password");
			  $(".error").text("Please insert username or password");
			}
		 else if(password==null||password==""){
				console.log("null password");
				$(".error").text("Please insert password");
			}
		 else{
			 $.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-user_account_management/login',
				type:'post',
				data:{
					Account:username,
					Password:password
				},
				success: function(data){
					if(data=="OK"){
						$("#myLoginModal").modal('hide');
						sessionStorage.setItem("username",username);
						sessionStorage.setItem("password",password);
						$(".logout").css('display','block');
		         $(".logReg").css('display','none');
						$(".error").text("");
						$("#LoginPwd").text("");
						$("#LoginUsername").text("");
						
						quaryMovieInfo(movieInfo.movieId);
						updateMovieInfo();
					alert("LOGIN SUCCESSFULLY！");
					
					}
					else
						{
							$(".error").text(data);
							$("#LoginPwd").text("");
						$("#LoginUsername").text("");
						}
				},
				error: function(errorMsg)
				{
					console.log("Login failed")
				}		
			});
		 }		
	});	
	});


$(document).ready(function(){
	$(".btn-close").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	$("#LoginCancel").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	$("#RegisterCancel").click(function(){
		$("#LoginPwd").text("");
		$("#LoginUsername").text("");
		$(".error").text("");
		$("#RegisterPwd").text("");
		$("#RegisterUsername").text("");
	});
});

$(document).ready(function(){
	
	 $(".logout").click(function(){
		 console.log("click logout");
		 sessionStorage.removeItem("username");
		 sessionStorage.removeItem("password");
		 $(".logout").css('display','none');
		$(".logReg").css('display','block');
		 quaryMovieInfo(movieInfo.movieId);
		updateMovieInfo();
	 });
});

$(document).ready(function(){
	 $("#searchBtn").click(function(){
		 var searchContent=$('#searchContent').val().trim();
		 setSession("searchContent",searchContent);
		 console.log(">>MS_RS_R<<"+searchContent);
		 setSession("typeBtn","movie");
		 $('#searchContent').val("");
	 });
});





//send info to movie info page:
//sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));



var div_movie_img;
var div_movie_title;
var div_movie_year;
var div_movie_rating;
var div_movie_director;
var div_movie_likeNum;
var button_movie_like;
var div_movie_actors;

$(document).ready(function(){
	movieInfo = JSON.parse(sessionStorage.getItem("showMovieBasicInfo"));
	
	div_movie_img = document.querySelector('#div_movie_img');
	div_movie_title = document.querySelector('#div_movie_title');
	div_movie_year = document.querySelector('#div_movie_year');
	div_movie_rating = document.querySelector('#div_movie_rating');
	div_movie_director = document.querySelector('#div_movie_director');
	div_movie_likeNum = document.querySelector('#div_movie_likeNum');
	div_movie_actors = document.querySelector('#div_movie_actors');
	
	updateMovieInfo();
	quaryMovieInfo(movieInfo.movieId);
	
});


function updateMovieInfo()
{
	if(movieInfo!==null)
	{
		console.log(movieInfo);
		setMovieImg(div_movie_img,movieInfo.title);
		div_movie_title.textContent = movieInfo.title;
		div_movie_year.textContent = "Release Year : "+movieInfo.year;
		div_movie_rating.textContent = movieInfo.rating;
		
		isLikeMovie(movieInfo.movieId);

		
		div_movie_likeNum.textContent = "Number of likes : "+movieInfo.likes;
		
		if(movieInfo.likes<0)
		{
			div_movie_likeNum.textContent = "Number of likes: null";
		}
		
		var directorShowString = "";
		if(movieInfo.directors!==undefined)
		{
			
			var directors = movieInfo.directors;
			
			if (directors.length>0)
			{
				directorShowString = directors[0].name;
				for (var i = 1; i < directors.length; i++) {
					directorShowString += " / "+directors[i].name;
				}
			}
			div_movie_director.textContent = "Director : "+directorShowString;
		}
		
		var starsShowString = "";
		if(movieInfo.stars!==undefined)
		{
			var stars = movieInfo.stars;
			if (stars.length>0)
			{
				starsShowString = stars[0].name;
				for (var i = 1; i < stars.length; i++) {
					starsShowString += " / "+stars[i].name;
				}
			}
			div_movie_actors.textContent = "Cast : "+starsShowString;
		}
		
		if(movieInfo.commentList!==undefined)
		{
			$(".showComment").empty();
			var commentList = movieInfo.commentList.comments;
			if (commentList.length>0)
			{
				console.log("show comments>>>"+commentList.length);
				
				for (var i = 0; i < commentList.length; i++) {
					var commentNumid ="";
					var text = document.createElement("Label");
					var name = document.createElement("Label");
					var div = document.createElement("div");
					var img = document.createElement("img");
					var div2 = document.createElement("div");
					var del = document.createElement("button");
					del.setAttribute("class","btn-close");
					div.appendChild(name);
					div.appendChild(text);
					var u=sessionStorage.getItem("username");
			        var p=sessionStorage.getItem("password");
					if(u==""||p==""||u==null||p==null)
						{
							console.log("not login...");
						}
					else{
						if(commentList[i].userAccount==u)
						{
							commentNumid = "commentNum"+i;
							console.log(">>>>>>>>"+commentNumid);
							div.appendChild(del);
							del.setAttribute("id",commentNumid);
						}
					}
					
					img.setAttribute("class","profileImg");
					text.setAttribute("class","Text");
					name.setAttribute("class","AccountName");
					div.setAttribute("class","textInfo");
					div2.setAttribute("class","comment-item");
					
					div2.appendChild(img);
					div2.appendChild(div);
					
					
					name.textContent = commentList[i].userAccount;
					text.textContent = commentList[i].text;
					$(".showComment").append(div2);
					if(commentNumid!=="")
						{
							deleteComment(commentNumid,commentList[i].commentId);
						}
					
						
					
				}
				
			}
			else{
				$(".showComment").text("No reviews now...");
			}
			
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
			console.log("query movie info success");
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

$(document).ready(function(){
	$("#toAllMovies").click(function(){
		 setSession("ClickTypeBtn","Popularity");
	 });
	
});

function isLikeMovie(id)
{
	var u=sessionStorage.getItem("username");
			var p=sessionStorage.getItem("password");
	if(u==""||p==""||u==null||p==null)
		{
			console.log("no login");
			$("#button_movie_like").css('display','block');
			$("#button_movie_dislike").css('display','none');
		}else{
			$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/isLike',
		type:'post',
		data:{
			Account: u,
			Password: p,
			MovieId: id
		},
		dataType: 'text',
		success: function(data){
			console.log("islike status");
			if(data=="true")
				{
					$("#button_movie_like").css('display','block');
			$("#button_movie_dislike").css('display','none');
				}
			else if(data=="false")
				{
					$("#button_movie_like").css('display','none');
			$("#button_movie_dislike").css('display','block');
				}
			else{
				$("#button_movie_like").css('display','none');
			$("#button_movie_dislike").css('display','block');
			}
			
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
		}
	
}

$(document).ready(function(){
	$("#button_movie_dislike").click(function(){
	        var u=sessionStorage.getItem("username");
			var p=sessionStorage.getItem("password");
		if (typeof(Storage) !== "undefined") {
	if(u==""||p==""||u==null||p==null)
	   {
	     $("#myLoginModal").modal('show');
	   }
	   else{
		   $.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/changeLikeStatus',
		type:'post',
		data:{
			Account:u,
			Password:p,
			MovieId: movieInfo.movieId
		},
		async:false,
		success: function(data){
			console.log("change like status success to like");
			$("#button_movie_like").css("display","none");
			$("#button_movie_dislike").css("display","block");
			quaryMovieInfo(movieInfo.movieId);
			updateMovieInfo();
			
		},
		error: function()
		{
			console.log("change like status fail");
		}		
	});
		   
	   }
	}
	else{
		console.log("check browser support failed");
	}
	});
	
	$("#button_movie_like").click(function(){
	        var u=sessionStorage.getItem("username");
			var p=sessionStorage.getItem("password");
		if (typeof(Storage) !== "undefined") {
	if(u==""||p==""||u==null||p==null)
	   {
	     $("#myLoginModal").modal('show');
	   }
	   else{
		   $.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/changeLikeStatus',
		type:'post',
		data:{
			Account:u,
			Password:p,
			MovieId: movieInfo.movieId
		},
		async:false,
		success: function(data){
			console.log("change like status success to dislike");
			$("#button_movie_like").css("display","block");
			$("#button_movie_dislike").css("display","none");
			quaryMovieInfo(movieInfo.movieId);
			updateMovieInfo();
		},
		error: function()
		{
			console.log("change like status fail");
		}		
	});
		   
	   }
	}
	else{
		console.log("check browser support failed");
	}
	});
});

/*Comment area*/
$(document).ready(function(){
	$("#sendCommentBtn").click(function(){
		var u=sessionStorage.getItem("username");
			var p=sessionStorage.getItem("password");
		if (typeof(Storage) !== "undefined") {
	  if(u==""||p==""||u==null||p==null)
	   {
	     $("#myLoginModal").modal('show');
	   }
	   else{
		   var review = $("#commentContent").val().trim();
		   if(review==null||review=="")
			   {
				   alert("The review is empty");
			   }
		   else{
			    $.ajax({
					url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/addComment',
					type:'post',
					data:{
						Account:u,
						Password:p,
						MovieId: movieInfo.movieId,
						Text:review
					},
					success: function(data){
					console.log("send review success");
						$('#commentContent').val("");
						quaryMovieInfo(movieInfo.movieId);
						updateMovieInfo();

					},
					error: function()
					{
					console.log("send review fail");
					}		
				});
		   	}
		   
	   		}
		}
	else{
		console.log("check browser support failed");
	}
	});
	

});



function deleteComment(ele,id) {
	$('#'+ele).click(function () {
        console.log("click del btn"+id);
		           var u=sessionStorage.getItem("username");
			       var p=sessionStorage.getItem("password");
		
				   $.ajax({
					url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-movie_info_management/removeComment',
					type:'post',
					data:{
						Account:u,
						Password:p,
						CommentId: id
					},
					success: function(data){
					console.log("delete review success");
					   quaryMovieInfo(movieInfo.movieId);
						updateMovieInfo();
						

					},
					error: function()
					{
					console.log("send review fail");
					}		
				});
    });
	
		 

    };
	



function setSession(name, value) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  window.opener.sessionStorage.setItem(name, value)
	} else {
	  sessionStorage.setItem(name, value)
	}
  };
  function getSession(name) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  return window.opener.sessionStorage.getItem(name)
	} else {
	  return sessionStorage.getItem(name)
	}
  };