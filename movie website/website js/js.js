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
function setSession(name, value) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  window.opener.sessionStorage.setItem(name, value)
	} else {
	  sessionStorage.setItem(name, value)
	}
  };
  function getSession(name) {
	if (window.opener && Object.getOwnPropertyNames(window.opener).length > 0) {
	  return window.opener.sessionStorage.getItem(name);
	} else {
	  return sessionStorage.getItem(name);
	}
  };

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
		 sessionStorage.removeItem("username");
		 sessionStorage.removeItem("password");
		 $(".logout").css('display','none');
		$(".logReg").css('display','block');
	 });
});

$(document).ready(function(){
	 $("#searchBtn").click(function(){
		 var searchContent=$('#searchContent').val().trim();
		 setSession("searchContent",searchContent);
		 console.log(">>MS_RS_R<<"+searchContent);
		 console.log(">>MS_RS1<<"+sessionStorage.getItem("searchContent"));
		 console.log(">>MS_RS2<<"+getSession("searchContent"));
		 setSession("typeBtn","movie");
		 $('#searchContent').val("");
	 });
});

window.onresize=function(){
	update_rating_list(false);
	update_new_movie_list(false);
}

$(document).ready(function(){
	showPopularityMovies();
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
			Limit:"[0,15]",
			OrderKey:"rating"
		},
		dataType: 'text',
		success: function(data){
			console.log("post success");
			setSession("rating_list_data",data);
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
	var data = JSON.parse(getSession("rating_list_data"));
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
	
	var showMargin = Math.floor((showPath.offsetWidth-itemDivWidth*showItemNum)/showItemNum/2)-1;
	var outMargin =  Math.floor((showPath.offsetWidth-showItemNum*(itemDivWidth+showMargin*2))/2)-1;
	
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
			Limit:"[0,15]",
			OrderKey:"year"
		},
		dataType: 'text',
		success: function(data){
			console.log("post success");
			setSession("new_movie_data",data);
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
	var data = JSON.parse(getSession("new_movie_data"));
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
	
	var showMargin = Math.floor((showPath.offsetWidth-itemDivWidth*showItemNum)/showItemNum/2)-1;
	var outMargin =  Math.floor((showPath.offsetWidth-showItemNum*(itemDivWidth+showMargin*2))/2)-1;
	
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
			/*console.log(data[i]);*/
			add_item_listener(id,data[i]);
			setMovieImg(id,data[i]);
		}
	}
}

function add_item_listener(id,data){
	var element=document.querySelector('#'+id);
    element.addEventListener("click",function () {
        console.log(data.title);
		//setSession("showMovieId",data.moveId);
		sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));
		window.open("movie info page.html");
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


$(document).ready(function(){
	$("#toAllMovies").click(function(){
		 setSession("ClickTypeBtn","Popularity");
		 
	 });
	
	 $("#viewMoreLatest").click(function(){
		 console.log("click viewMoreLatest");
		 setSession("ClickTypeBtn","Latest");
		 
	 });
	
	$("#viewMoreHighRating").click(function(){
		 console.log("click viewMoreHighRating");
		setSession("ClickTypeBtn","HighScore"); 
	 });
});

function showPopularityMovies(){
	$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				data:{
					Limit:'[0,7]',
					OrderKey:'votes',
				},
			   dataType: 'json',
				success: function(data){
					console.log("show all popularity movies successfully!"+JSON.stringify(data));
	            	showPMovies(data);
				
				},
				error: function()
				{
					console.log("show popularity movies failed");
				}		
			});
};

function showPMovies(Rdata){
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].title,
				type:'get',
			   dataType: 'json',
				  async: false,
				success: function(Mdata){
					console.log("search image successfully!");
					
					var h = document.createElement("h3");
					var div = document.createElement("div");
					var img = document.createElement("img");
					var div2 = document.createElement("div");
					div.appendChild(h);
					img.setAttribute("class","d-block");
						div.setAttribute("class","carousel-caption");

					div2.appendChild(img);
					div2.appendChild(div);
					if(i==0)
						{
							div2.setAttribute("class","carousel-item active");
							console.log("carousel-item active"+i);
						}
					else
						{
							div2.setAttribute("class","carousel-item");
						}
					
					var backdrop_path = "no";
					
					try{
						backdrop_path = JSON.stringify(Mdata.results[0].backdrop_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(backdrop_path=="no"||backdrop_path=="null")
						{	
							console.log("show all movies without movie photo");
						   img.src = "img/moviePhoto.png";
						   h.textContent = Rdata[i].title;
							
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+backdrop_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC_RE<<"+imgS);
                        h.textContent = Rdata[i].title;
						
					}
 
						$(".carousel-inner").append(div2);
					   clickMovieItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }
			  
			      
};


function clickMovieItem(data){
	$(".carousel-item").click(function(){
		sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));
		window.open("movie info page.html");
	});
};
