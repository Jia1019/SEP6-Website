/**var setCookie = function (name, value, day) {
 
    var expires = day * 24 * 60 * 60 * 1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + expires);
    document.cookie = name + "=" + value + ";expires=" + exp.toUTCString();
};

var delCookie = function (name) {
    setCookie(name, ' ', -1);
};

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}

var user=getCookie("username");
var psw=getCookie("password");**/

var user=sessionStorage.getItem("username");
var psw=sessionStorage.getItem("password");


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
			var loadingPic = document.createElement('img');
			loadingPic.id = 'loadImg';
			loadingPic.className = 'loadImg';
			loadingPic.setAttribute('src','../img/loading.gif');
			var loadingPicContainer = document.createElement('div');
			loadingPicContainer.id = 'loadImgContainer';
			loadingPicContainer.appendChild(loadingPic);
			var loginBtnHolder = document.getElementById(loginBtnHolder);
			$("#loginBtnHolder").append(loadingPicContainer);
			console.log("img added");
			$("#LoginConfirm").attr("disabled",true);
			function completeLoading()
			{
				if(document.readyState == "complete")
				{
					$("#loadImg").remove();
					console.log("img removed");
				}
			};
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
					alert("LOGIN SUCCESSFULL!");
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
			completeLoading();
			$("#LoginConfirm").attr("disabled",false);
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
		 sessionStorage.clear();
		 $(".logout").css('display','none');
		$(".logReg").css('display','block');
	 });
});

$(document).ready(function(){
	 $("#searchBtn").click(function(){
		 var searchContent=$('#searchContent').val().trim();
		 sessionStorage.setItem("searchContent",searchContent);
		 $('#searchContent').text("");
		
	 });
});

window.onresize=function(){
	update_rating_list(false);
	update_new_movie_list(false);
}

$(document).ready(function(){
	update_rating_list(true);
	quary_rating_list_data();
	update_new_movie_list(true);
	quary_new_movie_data();
	
});

function quary_rating_list_data()
{
	console.log("start quary movies by rating");
	$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
		type:'post',
		data:{
			Limit:"[0,10]",
			OrderKey:"rating"
		},
		dataType: 'text',
		success: function(data){
			sessionStorage.setItem("rating_list_data",data);
			update_rating_list(false);
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
}

function update_rating_list(init){
	var title = "rating";
	var data = JSON.parse(sessionStorage.getItem("rating_list_data"));
	if(data===null){
		init = true;
	}
	var showPath = document.querySelector('#top_rating_show_path');
	var showListPath = document.querySelector('#top_rating_list');
	var itemDiv = document.querySelector('.div_movieItem');
	var itemDivWidth = itemDiv.offsetWidth;
	var minMargin = 15;
	var canShowNum = Math.floor(showPath.offsetWidth/(itemDivWidth+minMargin*2));
	var showItemNum = canShowNum;
	if(!init)
	{
		showItemNum = Math.min(canShowNum,data.length);
	}
	
	var showMargin = Math.floor((showPath.offsetWidth-itemDivWidth*showItemNum)/showItemNum/2);
	var outMargin = (showPath.offsetWidth-showItemNum*(itemDivWidth+showMargin*2))/2;
	
	showListPath.innerHTML = "";

	showListPath.style.margin = "0px "+outMargin+"px";
	
	for (var i = 0; i < showItemNum; i++) {
		var id = title+"_movieItem_"+i;
		var divItemStr = 
			"<div id='"+id+"' class='div_movieItem' style='margin: 20px "+showMargin+"px'>"+
			"<a class='a_movieItem'>"+
			"<div class='div_movieImg'></div>"+
			"<div class='div_movieBottom'>";
		if(init){
			divItemStr = divItemStr+
			"<div class='div_title' style='max-width: 80%;'>[Movie Title]</div>"+
			"<div class='div_movieSubInfo'>[Rating]</div>"+
			"</div></a></div>";
		}
		else{
			divItemStr = divItemStr+
			"<div class='div_title' style='max-width: 80%;'>"+data[i].title+"</div>"+
			"<div class='div_movieSubInfo'>"+data[i].rating+"</div>"+
			"</div></a></div>";
		}
		$("#top_rating_list").append(divItemStr);
		if(!init)
		{
			add_item_listener(id,data[i]);
			setMovieImg(id,data[i]);
		}
	}
}

function quary_new_movie_data()
{
	console.log("start quary movies by year");
	$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
		type:'post',
		data:{
			Limit:"[0,10]",
			OrderKey:"year"
		},
		dataType: 'text',
		success: function(data){
			sessionStorage.setItem("new_movie_data",data);
			update_new_movie_list(false);
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
}

function update_new_movie_list(init){
	var title = "new_movie";
	var data = JSON.parse(sessionStorage.getItem("new_movie_data"));
	if(data===null){
		init = true;
	}
	var showPath = document.querySelector('#new_movie_show_path');
	var showListPath = document.querySelector('#new_movie_list');
	var itemDiv = document.querySelector('.div_movieItem');
	var itemDivWidth = itemDiv.offsetWidth;
	var minMargin = 15;
	var canShowNum = Math.floor(showPath.offsetWidth/(itemDivWidth+minMargin*2));
	var showItemNum = canShowNum;
	if(!init)
	{
		showItemNum = Math.min(canShowNum,data.length);
	}
	
	var showMargin = Math.floor((showPath.offsetWidth-itemDivWidth*showItemNum)/showItemNum/2);
	var outMargin = (showPath.offsetWidth-showItemNum*(itemDivWidth+showMargin*2))/2;
	
	showListPath.innerHTML = "";

	showListPath.style.margin = "0px "+outMargin+"px";
	
	for (var i = 0; i < showItemNum; i++) {
		var id = title+"_movieItem_"+i;
		var divItemStr = 
			"<div id='"+id+"' class='div_movieItem' style='margin: 20px "+showMargin+"px'>"+
			"<a class='a_movieItem'>"+
			"<div class='div_movieImg'></div>"+
			"<div class='div_movieBottom'>";
		if(init){
			divItemStr = divItemStr+
			"<div class='div_title' style='max-width: 80%;'>[Movie Title]</div>"+
			"<div class='div_movieSubInfo'>[Rating]</div>"+
			"</div></a></div>";
		}
		else{
			divItemStr = divItemStr+
			"<div class='div_title' style='max-width: 80%;'>"+data[i].title+"</div>"+
			"<div class='div_movieSubInfo'>"+data[i].rating+"</div>"+
			"</div></a></div>";
		}
		$("#new_movie_list").append(divItemStr);
		if(!init)
		{
			add_item_listener(id,data[i]);
			setMovieImg(id,data[i]);
		}
	}
}

function add_item_listener(id,data){
	var element=document.querySelector('#'+id);
    element.addEventListener("click",function () {
        console.log(data.title);
    });
}

function setMovieImg(id,movie){
	var src = "./img/moviePhoto.png";
	var element=document.querySelector('#'+id);
	var maxCheckNum = 1;
	$.ajax({
		url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+movie.title,
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