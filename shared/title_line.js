var titleLine = Titanium.UI.createView({
	top: 0,
	height: 30,
	width: 320,
	backgroundColor: '#2b2b2b'
});

var titleLabel = Ti.UI.createLabel({
	color:'#fff',
	//backgroundColor:'#2b2b2b',
	font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica'},
	width:'auto',
	top:0,
	left:5,
	text: Titanium.App.Properties.getString("_TITLE_DEFAULT")
});

function setTitleLineStyle(tlstyle) {
	switch(tlstyle)
	{
	case "default":
	  titleLine.height = 30;
	  titleLine.opacity = 1.0;
	  titleLabel.font = {fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	  break;
	case "item":
	  titleLine.height = 30;
	  titleLine.opacity = 0.6;
	  titleLabel.font = {fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	  break;
	case "mini":
	  titleLine.height = 30;
	  titleLine.opacity = 1.0;
	  titleLabel.font = {fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	  break;
	}
}

titleLine.add(titleLabel);