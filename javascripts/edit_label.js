
function CreateLabel()
{
	var it = document.getElementById( 'edit_label' ).parentNode; 
	var name = document.getElementById("new_label"); 
	var space = document.getElementById( 'space_id' ); 
	if( name.value.length ==0 ) return;
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ) it.innerHTML = xhr.responseText;
	}
	var data = "ajax=label&space_id=" + space.value + "&create=" + name.value;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
}
function RemoveLabel()
{
	var it = document.getElementById( 'edit_label' ).parentNode; 
	var space = document.getElementById( 'space_id' ); 
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ) it.innerHTML = xhr.responseText;
	}
	var it2 = document.getElementById("label_name"); 
	var data = "ajax=label&space_id=" + space.value + "&delete=" + it2.value;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
}
function RenameLabel()
{
	var it1 = document.getElementById('label_name'); 
	var it2 = document.getElementById('rename_edit'); 
	var space = document.getElementById( 'space_id' ); 
	if( it1.value == it2.value ){
		HidePrompt( "prompt_rename" );
		return;
	}
	var it = document.getElementById( 'edit_label' ).parentNode; 
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
		if( xhr.readyState == 4 && xhr.status == 200 ) it.innerHTML = xhr.responseText;
	}
	var name1 = it1.value.replace( ' ', '+' );
	var name2 = it2.value.replace( ' ', '+' );
	var data = "ajax=label&space_id=" + space.value + "&label=" + name1 + "&name=" + name2;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
}
function SetLabelRow( name )
{
	var it1 = document.getElementById(name+' row'); 
	var row = it1.value;
	var space = document.getElementById( 'space_id' ); 
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
	}
	var data = "ajax=label&space_id=" + space.value + "&label=" + name + "&row=" + row;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
}
function SetLabelSort( name )
{
	var it1 = document.getElementById(name+' sort'); 
	var sort = it1.value;
	var space = document.getElementById( 'space_id' ); 
	var xhr = CreateXHR();
	xhr.onreadystatechange = function()
	{ 
	}
	name = name.replace( ' ', '+' );
	var data = "ajax=label&space_id=" + space.value + "&label=" + name + "&sort=" + sort;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
}
function ShowRemoveLabel( label )
{
	var it = document.getElementById('label_name'); 
	it.value = label;
	ShowPrompt( 'prompt_remove' );
}
function ShowRenameLabel( panel, label )
{
	var it1 = document.getElementById('rename_edit'); 
	var it2 = document.getElementById('label_name'); 
	it1.value = label;
	it2.value = label;
	ShowPrompt( panel );
}
function ChangeLabelColor( label, color )
{
	var xhr = CreateXHR();
	var it = document.getElementById( 'edit_label' ).parentNode; 
	var space = document.getElementById( 'space_id' ); 
	xhr.onreadystatechange = function()
	{ 
		//alert( "" + xhr.readyState + ", " + xhr.status );
		if( xhr.readyState == 4 && xhr.status == 200 ){
			//alert( xhr.responseText );
			it.innerHTML = xhr.responseText;
			//alert( it.innerHTML );
		}
	}
	label = label.replace( ' ', '+' );
	var data = "ajax=label&space_id=" + space.value + "&label=" + label + "&color=" + color;
	xhr.open( "POST", "/ajax_server", true); 
	xhr.send( data ); 
	HidePrompt( "prompt_recolor" );
}
function ShowRecolorLabel( panel, label )
{
	var i, j, k;
	var c = [ "0", "5", "a", "f" ];
	var c2 = [ "0", "a", "5", "f" ];
	var src = "";
	for( i=0; i<4; i++){
		for( j=0; j<4; j++){
			if( j % 2 ==0 ) src += "<tr>";
			var style = "width:20pt;height:20pt;border:none;background:#";
			for( k=0; k<4; k++){
				var color = c[i] + c2[j] + c[k];
				var td = "<td style=\"background: #" + color + "\">";
				var a = "<a onclick=\"ChangeLabelColor('" + label + "', '";
				a += color + "')\"><input style=\"" + style + color + "\"/></a></td>";
				src += td + a;
			}
			if( j % 2 ) src += "</tr>\n";
		}
	}
	//alert( src );
	var it = document.getElementById( "color_table" ); 
	it.innerHTML = src;
	ShowPrompt( "prompt_recolor" );
	/*
	*/
}
