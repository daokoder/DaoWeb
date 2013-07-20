
function CreateXHR() 
{
	var request = false;
	try {
		request = new ActiveXObject('Msxml2.XMLHTTP');
	} catch (err2) {
		try {
			request = new ActiveXObject('Microsoft.XMLHTTP');
		} catch (err3) {
			try {
				request = new XMLHttpRequest();
			} catch (err1) {
				request = false;
			}
		}
	}
	return request;
}
function LoadHtmlCode( name )
{
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		var it = document.getElementById( 'code_' + name ); 
		if( xhr.readyState == 4 && xhr.status == 200 ) it.innerHTML = xhr.responseText;
	}
	xhr.open( "GET", "/static_code.dao?name=" + name, true); 
	xhr.send( null ); 
}
function AjaxLoad()
{
	LoadHtmlCode( "menu" );
	LoadHtmlCode( "form_login" );
}

function LoadValidationImage()
{
}
function Login()
{
	var it1 = document.getElementById('username'); 
	var it2 = document.getElementById('password'); 
	if( it1.value == "" || it2.value.length < 4 ){
		alert( "username is empty or password is too short" );
		return false;
	}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		var it = document.getElementById('status_message'); 
		it.innerHTML = "Waiting to login ...";
		/*
		if( xhr.readyState ==4 ) alert( xhr.responseText );
		alert( xhr.readyState + ' ' + xhr.status );
		*/
		if( xhr.readyState == 4 && xhr.status == 200 ){
			var root = xhr.responseXML.documentElement;
			var i, id=0, sta=4, username="", message="", cookie="";
			for( i=0; i<root.childNodes.length; i++ ){
				var node = root.childNodes[i];
				var text = node.textContent;
				switch( node.tagName ){
					case "id" : id = parseInt( text ); break;
					case "username" : username = text; break;
					case "status" : sta = parseInt( text ); break;
					case "message" : message = text; break;
					case "cookie" : cookie = text; break;
				}
				continue;
			}
			//alert( cookie );
			if( cookie != "" ) document.cookie = cookie;
			if( sta ) it.innerHTML = message; else location.reload(true);
			//var it2 = document.getElementById('image_validation'); 
			//it2.setAttribute( "src", "vbar3.png" );
		}
	}
	var data = "username=" + it1.value;
	data += "&password=" + it2.value;
	xhr.open("POST", "/ajax_login", true); 
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
	return false;
}
function Signup()
{
	var it1 = document.getElementById('username'); 
	var it2 = document.getElementById('password'); 
	var it3 = document.getElementById('password2'); 
	var it = document.getElementById('confirm_password'); 
	var it4 = document.getElementById('confirm_password2'); 
	var lang = document.getElementById('lang_confirm'); 
	if( it3 == null ){
		it.innerHTML = lang.value;
		it4.innerHTML = "<input type=\"password\" id=\"password2\" value=\"\" style=\"max-width:120pt\"/>";
		return;
	}
	if( it1.value == "" || it2.value.length < 4 ){
		alert( "username is empty or password is too short" );
		return;
	}
	it3 = document.getElementById('password2'); 
	if( it2.value != it3.value ){
		alert( "passwords are not matching" );
		return;
	}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		var it = document.getElementById('status_message'); 
		it.innerHTML = "Waiting to signup ...";
		if( xhr.readyState == 4 && xhr.status == 200 ){
			var root = xhr.responseXML.documentElement;
			var i, id=0, sta=4, username="", message="", cookie="";
			for( i=0; i<root.childNodes.length; i++ ){
				var node = root.childNodes[i];
				var text = node.textContent;
				switch( node.tagName ){
					case "id" : id = parseInt( text ); break;
					case "username" : username = text; break;
					case "status" : sta = parseInt( text ); break;
					case "message" : message = text; break;
					case "cookie" : cookie = text; break;
				}
				continue;
			}
			if( cookie != "" ) document.cookie = cookie;
			if( sta ) it.innerHTML = message; else location.reload(true);
			//var it2 = document.getElementById('image_validation'); 
			//it2.setAttribute( "src", "vbar3.png" );
		}
	}
	var data = "username=" + it1.value;
	data += "&password=" + it2.value;
	xhr.open("POST", "/ajax_signup", true); 
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
}
function Logout()
{
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ) location.reload(true);
	}
	xhr.open( "GET", "/ajax_logout", true); 
	xhr.send( null ); 
}
function GetCookie(name)
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if( document.cookie.substring(i, j) == arg ){
			var endstr = document.cookie.indexOf (";", j);
			if( endstr == -1 ) endstr = document.cookie.length;
			return unescape(document.cookie.substring(j, endstr));
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return "";
}

function ShowMessage( message )
{
	var it = document.getElementById( "message_text" ); 
	it.innerHTML = message;
	ShowPrompt( "message_box" );
}
function ShowPrompt( name )
{
	var it = document.getElementById(name); 
	it.style.display = 'block';
}
function HidePrompt( name )
{
	var it = document.getElementById(name); 
	it.style.display = 'none';
}
function PromptImport()
{
	ShowPrompt( 'prompt_upload' );
}
function ImportSource()
{
	var it = document.getElementById( 'filename' ); 
	alert( it.value );
}
function PromptUploadImage( name )
{
	var it = document.getElementById( 'image_name' ); 
	it.value = name;
	ShowPrompt( 'prompt_upload' );
}
function UploadImage()
{
	HidePrompt( 'prompt_upload' );
	var it = document.getElementById( 'filename' ); 
	if( it.value == '' ) return false;
	return true;
}
function StopUpload( info )
{
	alert( info );
	// location.reload(true); cause infinity looping, post data is sent repeatedly???
	location.href = location.href;
}
function ChangeLanguage( lang )
{
	document.cookie = 'LANG=' + lang + '; path=/';
	location.reload(true);
}
function SetTimeZoneCookie()
{
	var tzo=(new Date().getTimezoneOffset()/60)*(-1); 
	document.cookie = 'TimeZone=' + tzo + '; path=/';
}
