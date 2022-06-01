var user=sessionStorage.getItem("username");
var psw=sessionStorage.getItem("password");
var wasReady = false;
var wasReadyD = false;
var wasReadyM = false;
var opt= 5;

function setready(ready)
{
	wasReady = ready;
}
function getready()
{
	return wasReady;
}
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
					alert("LOGIN SUCCESSFULLY!");
						sessionStorage.setItem("username",username);
						sessionStorage.setItem("password",password);
					$("#myLoginModal").modal('hide');
					$(".logout").css('display','block');
		         $(".logReg").css('display','none');
						$(".error").text("");
						$("#LoginPwd").text("");
						$("#LoginUsername").text("");
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
	$("#searchAmount").change(function(){
		wasReady = false;
		console.log(">>PR_WR<<"+getready());
		setupSelect();
		wasReadyD = false;
		searchDirector();
		wasReadyM = false;
		searchMovie();
	});
});
function setupSelect(){
	if($("#searchAmount").val()!=null)
	{
	opt=$("#searchAmount").val();
	console.log(">>SLE_A<<"+opt); 
	searchActor();
	return opt; 
	}
	else
	{
		console.log(">>SLE<< Not Ready");
		opt = 5;
		searchActor();
		return opt; 
	}
};

function setupDirSelect(){
	if($("#searchAmount").val()!=null)
	{
	opt=$("#searchAmount").val();
	console.log(">>SLE_D<<"+opt); 
	searchDirector();
	return opt; 
	}
	else
	{
		console.log(">>SLE<< Not Ready");
		opt = 5;
		searchDirector();
		return opt; 
	}
};

function setupDirSelect(){
	if($("#searchAmount").val()!=null)
	{
	opt=$("#searchAmount").val();
	console.log(">>SLE_D<<"+opt); 
	searchMovie();
	return opt; 
	}
	else
	{
		console.log(">>SLE<< Not Ready");
		opt = 5;
		searchMovie();
		return opt; 
	}
};

function delay(time) {
	console.log("Delay start "+time);
	return new Promise(resolve => setTimeout(resolve, time));
}

//Movie search request
var type=getSession("typeBtn");
$(document).ready(function(){
	clickAndShowTypeBtn(type);
	searchMovie();
	searchActor();
	searchDirector();
	var content = getSession("searchContent");
	$('#searchContent').val(content);
	$("#searchBtn").click(function(){
		var searchContent = $('#searchContent').val().trim();
		console.log(">>SERA<<type button"+type);
		console.log(">>SERA<<search Content"+searchContent);
		setSession("searchContent",searchContent);
		setSession("typeBtn","movie");
		clickAndShowTypeBtn(type);
		searchMovie();
		searchActor();
		searchDirector();
		$('#searchContent').val("");
	 });
});
function searchMovie()
{
	if(wasReadyD)
	{
		console.log(">>WRT<<Stop updating "+wasReadyM);
	}
	wasReadyM = true;
	var searchLimit = '[0,'+setupSelect()+']';
	console.log(">>SR1<<"+getSession("searchContent"));
	var searchContentFromLastPage = getSession("searchContent");
	console.log(">>VA1<<"+searchContentFromLastPage);
	if(searchContentFromLastPage==""||searchContentFromLastPage==null)
		{
			 $('.searchResult').text("WHAT DO YOU WANT TO SEARCH ? ");
		}
	else{
		//$('#searchContent').textContent=searchContentFromLastPage;
		console.log(">>SR2<<"+getSession("searchContent"));
		$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/moviesByKeyword',
				type:'post',
				async:false,
				data:{
					Title:searchContentFromLastPage,
					Limit:searchLimit,
				},
			   dataType: 'json',
				success: function(data){
					if(data!='')
					{
						console.log("search successfully!");
						//console.log("all movies results"+JSON.stringify(data));
						showMoviesResults(data);
					}
					else
					{
						var emp = document.createElement("a")
						emp.textContent = "Sorry! There is no result in search of films: "+searchContentFromLastPage;
						$(".searchResult").append(emp);
					}
				},
				error: function()
				{
					console.log("search failed");
				}		
			});
	}
	 
};
function clearStorage(){
    sessionStorage.removeItem("searchContent");
	console.log(">>SR3<<"+sessionStorage.getItem("searchContent"));
}
//Movie search display
function showMoviesResults(Rdata){
	var str = "";
	
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/movie?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].title,
				type:'get',
			   dataType: 'json',
				  async: false,
				success: function(Mdata){
					console.log("search image successfully!");
					//console.log("search image successfully!!!!"+JSON.stringify(Mdata));
					var textBox = document.createElement("div");
					var text = document.createElement("a");
					var moviediv = document.createElement("div");
					var img = document.createElement("img");
					var rate = document.createElement("Label");
					img.setAttribute("class","moviePosterImg");
					moviediv.setAttribute("class","movieContainer");
					textBox.setAttribute("class","inboxtext");
					moviediv.appendChild(img);
					textBox.appendChild(text);
					textBox.appendChild(rate);
					moviediv.appendChild(textBox);
					var poster_path = "no";
					try{
						poster_path = JSON.stringify(Mdata.results[0].poster_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(poster_path=="no"||poster_path=="null")
						{	
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].title;
                        
							rate.textContent = Rdata[i].rating;
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+poster_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						//console.log(">>IMGSRC<<"+imgSrc);
						console.log(">>IMGSRC_RE<<"+imgS);
                        text.textContent = Rdata[i].title;
						rate.textContent = Rdata[i].rating;
					}
		  
            
              $(".searchResult").append(moviediv);
					clickMovieItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
			  }

};
//Actor search request

function searchActor()
{
	if(getready())
	{
		console.log(">>WRT<<Stop updating "+getready());
	}
	else
	{
		wasReady = true;
		var searchContentFromLastPage = getSession("searchContent");
		console.log(searchContentFromLastPage);
		if(searchContentFromLastPage==""||searchContentFromLastPage==null)
			{
				 $('.searchResult').text("WHAT DO YOU WANT TO SEARCH ? ");
			}
		else{
			//$('#searchContent').text(searchContentFromLastPage);
			var searchLimit = '[0,'+setupSelect()+']';
			$.ajax({
					url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/stars',
					type:'post',
					data:{
						StarName:searchContentFromLastPage,
						Limit:searchLimit,
					},
			  		dataType: 'json',
					success: function(data){
					if(data!='')
					{
					console.log("search successfully!");
					//console.log("all Stars results"+JSON.stringify(data));
	            	showStarsResults(data);
					}
					else
					{
						var emp = document.createElement("a")
						emp.textContent = "Sorry! There is no result in search of Actors: "+searchContentFromLastPage;
						$(".actorResult").append(emp);
					}
				},
				error: function()
				{

					console.log("search failed "+searchLimit);
				}		
			});
		}
	 
	}
};
//Actor search display
function showStarsResults(Rdata){
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/person?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].name,
				type:'get',
			   dataType: 'json',
				  async: false,
				success: function(Mdata){
					var starTextBox = document.createElement("div");
					var text = document.createElement("a");
					var divForStar = document.createElement("div");
					var img = document.createElement("img");
					var birth = document.createElement("p");
					divForStar.appendChild(img);
					starTextBox.appendChild(text);
					starTextBox.appendChild(birth);
					img.setAttribute("class","peopleImg");
					divForStar.setAttribute("class","starContainer");
					starTextBox.setAttribute("class","inboxtext");
					divForStar.appendChild(starTextBox);
					var profile_path = "no";
					
					try{
						profile_path = JSON.stringify(Mdata.results[0].profile_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(profile_path=="no"||profile_path=="null")
						{	
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].name;
                           //str ="<div>"+ Rdata[i].title+"</div>";
							if(Rdata[i].birth!==0)
								{
									birth.textContent = "birth : "+Rdata[i].birth;
								}
							
						   
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+profile_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC_RE<<"+imgS);
                        text.textContent = Rdata[i].name;
						if(Rdata[i].birth!==0)
								{
									birth.textContent = "birth : "+Rdata[i].birth;
								}
						
					}
		  
            
              $(".actorResult").append(divForStar);
					clickActorItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
		}
};
//Director search request

function searchDirector(){
	if(wasReadyD)
	{
		console.log(">>WRT<<Stop updating "+wasReadyD);
	}
	else
	{
	wasReadyD = true;
	console.log(">>WR1<<Start");
	console.log(">>WRF<<Was ready set to true");
	var searchContentFromLastPage = getSession("searchContent");
	console.log(">>SEAC<<"+searchContentFromLastPage);
	if(searchContentFromLastPage==""||searchContentFromLastPage==null)
		{
			 console.log(">>WRF<<Enter null Seq,Ind state: "+wasReadyD);
			 $('.searchResult').text("WHAT DO YOU WANT TO SEARCH ? ");
			 console.log(">>WR1<<Set true");
		}
	else{
		console.log(">>WRF<<Enter ind Seq,Ind state: "+wasReadyD);
		var searchLimit = '[0,'+setupSelect()+']';
		console.log(">>SearchCAP<<"+searchLimit);
		//$('#searchContent').text(searchContentFromLastPage);
		$.ajax({
				url:'https://us-central1-sem-demo-mk0.cloudfunctions.net/function-key_word_search/directors',
				type:'post',
				data:{
					DirectorName:searchContentFromLastPage,
					Limit:searchLimit,
				},
			    dataType: 'json',
				success: function(data){
					if(data!='')
					{
					console.log("search Director successfully!");
					//console.log("all Director results"+JSON.stringify(data));
	            	showDirectorResults(data);
					}
					else
					{
						var emp = document.createElement("a")
						emp.textContent = "Sorry! There is no result in search of Directors: "+searchContentFromLastPage;
						$(".directorResult").append(emp);
					}
				},
				error: function()
				{
					console.log("search failed");
					
				}		
			});
		}
	}
	 
};
//Director search display
function showDirectorResults(Rdata){
          for (var i = 0; i < Rdata.length; i++) { 
			  $.ajax({
				url:'https://api.themoviedb.org/3/search/person?api_key=12aa6fa5f9d0e956ea2a1c6bf00f24c8&query='+Rdata[i].name,
				type:'get',
			    dataType: 'json',
				async: false,
				success: function(Mdata){
					var dirTextBox = document.createElement("div");
					var text = document.createElement("a");
					var divForDir = document.createElement("div");
					var img = document.createElement("img");
					var birth = document.createElement("p");
					divForDir.appendChild(img);
					dirTextBox.appendChild(text);
					dirTextBox.appendChild(birth);
					img.setAttribute("class","peopleImg");
					divForDir.setAttribute("class","dirContainer");
					dirTextBox.setAttribute("class","inboxtext");
					divForDir.appendChild(dirTextBox);
					var profile_path = "no";
					try{
						profile_path = JSON.stringify(Mdata.results[0].profile_path);
					}
					catch(e){
						console.log("error"+e);
					}
					if(profile_path=="no"||profile_path=="null")
						{	
						   img.src = "img/moviePhoto.png";
						   text.textContent = Rdata[i].name;
            				if(Rdata[i].birth!==0)
								{
									birth.textContent = "      birth : "+Rdata[i].birth;
								}
							
						}
					else{
						var imgSrc = "https://image.tmdb.org/t/p/w500"+profile_path;
						var imgS = imgSrc.replaceAll('"','');
						img.src = imgS;
						console.log(">>IMGSRC_RE_DR<<"+imgS);
                        text.textContent = Rdata[i].name;
						if(Rdata[i].birth!==0)
								{
									birth.textContent = "      birth : "+Rdata[i].birth;
								}
						
					}
              $(".directorResult").append(divForDir);
					clickDirectorItem(Rdata[i]);
				},
				error: function()
				{
					console.log("search image failed");
				}		
			});
		}
};

$(document).ready(function(){
$("#actorBtn").click(function(){
	setSession("typeBtn","actor");
		var type=getSession("typeBtn");
		clickAndShowTypeBtn(type);
});
$("#movieBtn").click(function(){
	setSession("typeBtn","movie");
		var type=getSession("typeBtn");
		clickAndShowTypeBtn(type);
});
$("#directBtn").click(function(){
	setSession("typeBtn","director");
		var type=getSession("typeBtn");
		clickAndShowTypeBtn(type);
});
});

function clickAndShowTypeBtn(type){
	if(type=="movie")
		 {
			 console.log(">>SER<<");
			$(".actorResult").css('display','none');
			$(".searchResult").css('display','block');
			$(".directorResult").css('display','none');
			 $("#movieBtn").attr("disabled",true);
			 $("#actorBtn").attr("disabled",false);
			 $("#directBtn").attr("disabled",false);
		 }
	else if(type=="actor")
		 {
			 console.log(">>ACT<<");
			$(".searchResult").css('display','none');
			$(".actorResult").css('display','block');
			$(".directorResult").css('display','none');
			 $("#movieBtn").attr("disabled",false);
			 $("#actorBtn").attr("disabled",true);
			 $("#directBtn").attr("disabled",false);
		 }
	else if(type=="director")
		 {
			 console.log(">>DIR<<");
			$(".actorResult").css('display','none');
			$(".searchResult").css('display','none');
			$(".directorResult").css('display','block');
			 $("#movieBtn").attr("disabled",false);
			 $("#actorBtn").attr("disabled",false);
			 $("#directBtn").attr("disabled",true);
		 }
	else{
			 console.log("no search type in session storage");
			$(".actorResult").css('display','none');
			$(".searchResult").css('display','none');
			$(".directorResult").css('display','none');
	}
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

$(document).ready(function(){
	$("#toAllMovies").click(function(){
		 setSession("ClickTypeBtn","Popularity");
		 
	 });
});

function clickMovieItem(data){
	$(".movieContainer").click(function(){
		sessionStorage.setItem("showMovieBasicInfo",JSON.stringify(data));
		window.open("movie info page.html");
	});
};

function clickDirectorItem(data){
	$(".dirContainer").click(function(){
		sessionStorage.setItem("showPersonInfo",JSON.stringify(data));
		sessionStorage.setItem("showPersonType","director");
		window.open("person info page.html");
	});
};

function clickActorItem(data){
	$(".starContainer").click(function(){
		sessionStorage.setItem("showPersonInfo",JSON.stringify(data));
		sessionStorage.setItem("showPersonType","actor");
		window.open("person info page.html");
	});
};