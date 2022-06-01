// JavaScript Document

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
		 sessionStorage.clear();
		 $(".logout").css('display','none');
		$(".logReg").css('display','block');
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

var personInfo;
var personType;

var div_person_img;
var div_person_name;
var div_person_bith;
var div_person_like;
var div_person_rate;


$(document).ready(function(){
	personInfo = JSON.parse(sessionStorage.getItem("showPersonInfo"));
	
	div_person_img = document.querySelector('#div_person_img');
	div_person_name = document.querySelector('#div_person_name');
	div_person_bith = document.querySelector('#div_person_birth');
	div_person_like = document.querySelector('#div_person_like');
	div_person_rate = document.querySelector('#div_person_rate');
	
	personType = sessionStorage.getItem("showPersonType");
	updatePersonInfo();
	if(personType=="director")
		{
			queryDirectorInfo(personInfo.id);
		}
	else if(personType=="actor"){
		queryActorInfo(personInfo.id);
	}
	else{
		console.log("no person type");
	}
	
	
	
});

function updatePersonInfo()
{
	if(personInfo!==null)
	{
		console.log(personInfo);
		setPersonImg(div_person_img,personInfo.name);
		div_person_name.textContent = personInfo.name;
		div_person_birth.textContent = personInfo.birth;
		if(personInfo.totalLike!==undefined)
			{
				div_person_like.textContent = "Total num of likes for all movies : "+personInfo.totalLike;
			}
		if(personInfo.avgRating!==undefined)
			{
				div_person_rate.textContent = "Average rating for all movies : "+personInfo.avgRating;
			}
		
		

		
		if(personInfo.movies!==undefined)
		{
			var moviesList = personInfo.movies;
			if (moviesList.length>0)
			{
				showPMovies(moviesList);
			}
		}
		
	}
}


function queryDirectorInfo(id){
	console.log("start showing person ["+id+"]");
	$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/directorMovies',
		type:'post',
		data:{
			Id:id,
			Limit:'[0,99]'
		},
		dataType: 'text',
		success: function(data){
			console.log("query director info success");
			personInfo = JSON.parse(data);
			updatePersonInfo();
			
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
}

function queryActorInfo(id){
	console.log("start showing actor person ["+id+"]");
	$.ajax({
		url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/starMovies',
		type:'post',
		data:{
			Id:id,
			Limit:'[0,99]'
		},
		dataType: 'text',
		success: function(data){
			console.log("query actors info success");
			personInfo = JSON.parse(data);
			updatePersonInfo();
			
		},
		error: function()
		{
			console.log("post fail");
		}		
	});
}

function setPersonImg(element,name){
	var src = "./img/profile.png";
	var maxCheckNum = 1;
	$.ajax({
		url:'https://api.themoviedb.org/3/search/person?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+name,
		type:'get',
		dataType: 'json',
		async: false,
		success: function(data){
			/*console.log("search image successfully!!!!"+JSON.stringify(data));*/
			var profile_path = "null";
			var result = data.results;
			var checkNum = Math.min(result.length,maxCheckNum);
			
			for(var i = 0; i < checkNum; i++) {
				var info = JSON.stringify(data.results[i].profile_path);
				if (info!=="null")
				{
					profile_path = info;
					break;
				}
			}
			console.log("img result>>>>>>>>>");
			console.log(data.results);
			if(profile_path!=="null")
			{
				var imgSrc = "https://image.tmdb.org/t/p/w500"+profile_path;
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

function showPMovies(Rdata){
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].title,
				type:'get',
			   dataType: 'json',
				  async: false,
				success: function(Mdata){
					console.log("search image successfully!");
					var textBox = document.createElement("div");
					var text = document.createElement("Label");
					var label = document.createElement("Label");
					var div = document.createElement("div");
					var img = document.createElement("img");
					var div2 = document.createElement("div");
					div.appendChild(img);
					textBox.appendChild(text);
					textBox.appendChild(label);
					img.setAttribute("class","BasicMoviesImg");
					text.setAttribute("class","BasicMoviesTitle");
					label.setAttribute("class","BasicMoviesRate");
					div2.appendChild(div);
					div2.appendChild(textBox);
					div2.setAttribute("class","grid-item");
					var poster_path = "no";
					
					try{
						poster_path = JSON.stringify(Mdata.results[0].poster_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(poster_path=="no"||poster_path=="null")
						{	
							console.log("show all movies without movie photo");
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].title;
							label.textContent = Rdata[i].rating;
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+poster_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC_RE<<"+imgS);
                        text.textContent = Rdata[i].title;
						label.textContent = Rdata[i].rating;
					}
 
						$("#Popularity-container").append(div2);
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
	$(".grid-item").click(function(){
		sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));
		window.open("movie info page.html");
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