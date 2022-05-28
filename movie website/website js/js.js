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
