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
		 setSession("typeBtn","movie");
		 $('#searchContent').val("");
	 });
});

/*Show btn types*/
var moviesType=getSession("ClickTypeBtn");
$(document).ready(function(){
	clickAndShowMoviesBtn(moviesType);
	 showLatestMovies();
	 showHighScoreMovies();
	 showPopularityMovies();
	 
	
});

/*Click btn to show popularity movies*/
$(document).ready(function(){
	$("#PopularityBtn").click(function(){
	{
		setSession("ClickTypeBtn","Popularity");
		var type=getSession("ClickTypeBtn");
		clickAndShowMoviesBtn(type);

	}
	});
	
	$("#LatestBtn").click(function(){
	{
		setSession("ClickTypeBtn","Latest");
		var type=sessionStorage.getItem("ClickTypeBtn");
		clickAndShowMoviesBtn(type);
		
	}
	});
	
	$("#HighScoreBtn").click(function(){
	{
		setSession("ClickTypeBtn","HighScore");
		var type=getSession("ClickTypeBtn");
		clickAndShowMoviesBtn(type);
	}
	});

});

function showPopularityMovies(){
	$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				data:{
					Limit:'[0,16]',
					OrderKey:'votes',
				},
			   dataType: 'json',
				success: function(data){
					console.log("show all popularity movies successfully!");
	            	showPMovies(data);
				
				},
				error: function()
				{
					console.log("show popularity movies failed");
				}		
			});
};

function showLatestMovies(){
	$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				data:{
					Limit:'[0,16]',
					OrderKey:'year',
				},
			   dataType: 'json',
				success: function(data){
					console.log("show all Latest movies successfully!");
	            	showLMovies(data);
			
				},
				error: function()
				{
					console.log("show Latest movies failed");
				}		
			});
};

function showHighScoreMovies(){
	$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				data:{
					Limit:'[0,16]',
					OrderKey:'rating',
				},
			   dataType: 'json',
				success: function(data){
					console.log("show all HighScore movies successfully!");
	            	showHMovies(data);
					
				},
				error: function()
				{
					console.log("show HighScore movies failed");
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
					var divContainer = document.createElement("div");
					var moreBtn = document.createElement("button");
					var textBox = document.createElement("div");
					var text = document.createElement("Label");
					var label = document.createElement("Label");
					var div = document.createElement("div");
					var img = document.createElement("img");
					var div2 = document.createElement("div");
					divContainer.setAttribute("class","divContainer");
					moreBtn.id = "moreBtn";
					moreBtn.innerHTML = '<a>Load More</a>'
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

function showLMovies(Rdata){
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
 
						$("#Latest-container").append(div2);
              			clickMovieItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }
			  
			      
};

function showHMovies(Rdata){
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
 
						$("#HighScore-container").append(div2);
						clickMovieItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }
			  
			      
};


function clickAndShowMoviesBtn(type){
	if(type=="Latest")
		 {
			 $("#Popularity-container").css('display','none');
			 $("#Latest-container").css('display','grid');
			 $("#HighScore-container").css('display','none');
			 $("#PopularityBtn").attr("disabled",false);
			 $("#LatestBtn").attr("disabled",true);
			 $("#HighScoreBtn").attr("disabled",false);
		 }
	else if(type=="HighScore")
		 {
			 $("#Popularity-container").css('display','none');
			 $("#Latest-container").css('display','none');
			 $("#HighScore-container").css('display','grid');
			 $("#PopularityBtn").attr("disabled",false);
			 $("#LatestBtn").attr("disabled",false);
			 $("#HighScoreBtn").attr("disabled",true);
		 }
	else if(type=="Popularity")
		 {
			 $("#Popularity-container").css('display','grid');
			 $("#Latest-container").css('display','none');
			 $("#HighScore-container").css('display','none');
			 $("#PopularityBtn").attr("disabled",true);
			 $("#LatestBtn").attr("disabled",false);
			 $("#HighScoreBtn").attr("disabled",false);
		 }
	else{
			 console.log("no movies type in session storage");
		$("#Popularity-container").css('display','none');
			 $("#Latest-container").css('display','none');
			 $("#HighScore-container").css('display','none');
	}
};

$(document).ready(function(){
	$("#toAllMovies").click(function(){
		 setSession("ClickTypeBtn","Popularity");		 
	 });
});

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



