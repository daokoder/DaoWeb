
function CreateText( preview )
{
	var up = document.getElementById( 'addarticle' ).parentNode; 
	var space = document.getElementById( 'space' ); 
	var prev = document.getElementById( 'preview' ); 
	var edit = document.getElementById( 'tid_edit' ); 
	var reply = document.getElementById( 'tid_reply' ); 
	var section = document.getElementById( 'section' ); 
	var title = document.getElementById( 'title' ); 
	var source = document.getElementById( 'source' ); 
	var page_name = document.getElementById( 'page_name' ); 
	var blog_post = document.getElementById( 'blog_post' ); 
	var forum_post = document.getElementById( 'forum_post' ); 
	var labels = document.getElementsByName( 'labels' );
	var signature = GetCookie( 'signature' );
	var it = preview ? prev : up;
	//alert( labels.item(0).checked );
	var i, labdata='';
	for( i=0; i<labels.length; i++ ){
		lab = labels.item(i);
		if( i ) labdata += ';';
		labdata += lab.value + ':' + lab.checked;
	}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ){
			if( preview ){
				it.innerHTML = xhr.responseText;
			}else{
				var text = xhr.responseText;
				var bk = text.indexOf( '{' );
				var info, data, json = text;
				if( bk >0 ){
					var suffix = text.substring( 0, bk );
					var pos = text.indexOf( suffix, bk );
					json = text.substring( bk, pos );
					data = text.substring( pos+bk, text.length );
				}
				var info = eval( '(' + json + ')' );
				if( info.status == "success" ){
					location.href = info.data;
				}else{
					ShowMessage( info.data );
					prev.innerHTML = data;
				}
			}
			//alert( xhr.responseText );
		}
	}
	var data = "ajax=";
	data += preview ? "preview" : "commit";
	data += "&space=" + space.value;
	data += "&title=" + encodeURIComponent( title.value );
	if( edit.value.length ) data += "&edit=" + encodeURIComponent( edit.value );
	if( reply.value.length ) data += "&reply=" + encodeURIComponent( reply.value );
	if( section.value.length ) data += "&section=" + encodeURIComponent( section.value );
	if( blog_post.checked ) data += "&blog=" + blog_post.checked;
	if( forum_post.checked ) data += "&forum=" + forum_post.checked;
	if( page_name.value.length ) data += "&name=" + page_name.value;
	if( labdata.length ) data += "&labels=" + encodeURIComponent( labdata );
	if( signature.length ) data += "&signature=" + signature;
	data += "&source=" + encodeURIComponent( source.value );
	xhr.open( "POST", "/ajax_server", true); 
	//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
}

function AdminText()
{
	var space = document.getElementById( 'space' ); 
	var edit = document.getElementById( 'tid_edit' ); 
	var title = document.getElementById( 'title' ); 
	var source = document.getElementById( 'source' ); 
	var page_name = document.getElementById( 'page_name' ); 
	var blog_post = document.getElementById( 'blog_post' ); 
	var forum_post = document.getElementById( 'forum_post' ); 
	var reformat_text = document.getElementById( 'reformat_text' ); 
	var create_version = document.getElementById( 'create_version' ); 
	var labels = document.getElementsByName( 'labels' );
	var signature = GetCookie( 'signature' );
	var i, labdata='';
	for( i=0; i<labels.length; i++ ){
		lab = labels.item(i);
		if( i ) labdata += ';';
		labdata += lab.value + ':' + lab.checked;
	}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		//alert( xhr.responseText, xhr.readyState, xhr.status );
		if( xhr.readyState == 4 && xhr.status == 200 ){
			if( xhr.responseText.length ) alert( xhr.responseText );
			location.reload(true);
		}
	}
	var data = "ajax=admin_text&space=" + space.value;
	data += "&title=" + encodeURIComponent( title.value );
	if( edit.value.length ) data += "&edit=" + encodeURIComponent( edit.value );
	if( blog_post.checked ) data += "&blog=" + blog_post.checked;
	if( forum_post.checked ) data += "&forum=" + forum_post.checked;
	if( reformat_text.checked ) data += "&reformat_text=" + reformat_text.checked;
	if( create_version.checked ) data += "&create_version=" + create_version.checked;
	if( page_name.value.length ) data += "&name=" + page_name.value;
	if( labdata.length ) data += "&labels=" + encodeURIComponent( labdata );
	if( signature.length ) data += "&signature=" + signature;
	xhr.open( "POST", "/ajax_server", true); 
	//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
}

function UploadText()
{
}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ){
		}
	}

function BackupText()
{
	var title = document.getElementById( 'title' ); 
	var source = document.getElementById( 'source' ); 
	var prev = document.getElementById( 'preview' ); 
	if( source.value.length < 20 ) return;
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ){
			//prev.innerHTML = xhr.responseText;
			//alert( xhr.responseText );
		}
	}
	var data = "ajax=backup&title=" + encodeURIComponent( title.value );
	data += "&source=" + encodeURIComponent( source.value );
	xhr.open( "POST", "/ajax_server", true); 
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
}

edit_count = 0;
function BackupText1()
{
	BackupText();
}
function BackupText2()
{
	var source = document.getElementById( 'source' ); 
	var max = 20;
	if( source.value.length > 1000 ) max = 50;
	edit_count ++;
	if( edit_count < max ) return;
	edit_count = 0;
	BackupText();
}
function DiscardText( url )
{
	location.href = url;
}
function RetoreBackup()
{
	var source = document.getElementById( 'source' ); 
	if( source.value.length > 10 ){
		var dis = confirm( "Do you want to discard the text in the editor?" );
		if( ! dis ) return;
	}
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ){
			source.value = xhr.responseText;
			//prev.innerHTML = xhr.responseText;
			//alert( xhr.responseText );
		}
	}
	var data = "ajax=restore";
	xhr.open( "POST", "/ajax_server", true); 
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send( data ); 
}
