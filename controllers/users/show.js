var win = Titanium.UI.currentWindow;
Titanium.include("../../shared/api_client.js");
Titanium.include("../../shared/title_line.js");
setTitleLineStyle("default");
titleLabel.text = Titanium.App.Properties.getString("_TITLE_USER");

function user(userXML) {
	var _name = userXML.getElementsByTagName("name").item(0).text;
	
	var LabelName = Ti.UI.createLabel({
		color:'#009cec',
		font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica'},
		textAlign: 'center',
		width:300,
		height:'auto',
		top:40,
		text: _name 
	});
	
	var ImageIcon = Ti.UI.createImageView({
		width:138,
		height:138,
		top: 70,
		url: userXML.getElementsByTagName("icon").item(0).text,
		backgroundImage:'../../images/loader_140x140.png'
		
	});
	
	var LabelLocation = Ti.UI.createLabel({
		color:'#000',
		font:{fontSize:14,fontWeight:'bold',fontFamily:'Helvetica'},
		textAlign: 'center',
		width:300,
		height:'auto',
		top:230,
		text: userXML.getElementsByTagName("location").item(0).text
	});
	
	var ButtonPersonalUrl = Titanium.UI.createButton({
		top:260,
		image:'../../images/button_pl_blue.png',
		backgroundSelectedImage: '../../images/button_pl_blue_e.png'
		width: 173,
		height: 26,
		title: "User Site",//userXML.getElementsByTagName("personal_url").item(0).text.str.substr(100),
		color:'#fff',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	});
	
	var ButtonGoToProjects = Titanium.UI.createButton({
		top:296,
		image:'../../images/button_pl_gray.png',
		backgroundSelectedImage: '../../images/button_pl_gray_e.png',
		width: 173,
		height: 26,
		title: "User Portfolio",
		color:'#000',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	});
	
	var lelements = [LabelName, ImageIcon, LabelLocation, ButtonPersonalUrl, ButtonGoToProjects];
	
	for (var i=0;i<lelements.length;i++) {
		win.add(lelements[i]);
	}
	
	ButtonPersonalUrl.addEventListener('click',function(e){
	    var webWindow = Ti.UI.createWindow();
	    webWindow.open(Titanium.Platform.openURL(userXML.getElementsByTagName("personal_url").item(0).text));
	});
	
	ButtonGoToProjects.addEventListener('click', function(e){
		Titanium.App.Properties.setString("_LINK_DEFAULT", Titanium.App.Properties.getString("_LINK_PORTFOLIO")+"/"+Titanium.App.Properties.getString("_FOCUSED_USER_URL")+".xml")
		Titanium.App.Properties.setString("_TITLE_DEFAULT",  _name+"\nportfolio");
		var projectsIndexWindow = Titanium.UI.createWindow({  
		    title:'Projects',
		    backgroundColor:'#fff',
			url: '../projects/index.js'
		});
		projectsIndexWindow.open();
	});
	
}


apiClient.getCollection(Titanium.App.Properties.getString("_LINK_REST_USERS")+Titanium.App.Properties.getString("_FOCUSED_USER_URL")+".xml", 'GET', win, parseResponse);

function parseResponse(rxml) {
	user(rxml)
	addPanel();
}

function addPanel() {
	win.add(titleLine);
}
