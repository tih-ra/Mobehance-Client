/* Button TOOLBAR */
var i=0;
// move scroll view left
var left = Titanium.UI.createButton({
	image:'../../images/left.png',
	width:37,
	height:37,
	left:10
});
left.addEventListener('click', function(e)
{
	if (i == 0) return;
	i--;
	scrollView.scrollToView(i)
});

// move scroll view right
var right = Titanium.UI.createButton({
	image:'../../images/right.png',
	width:37,
	height:37,
	right:10
});

right.addEventListener('click', function(e)
{
	if (i == (scrollView.views.length-1)) return;
	i++;
	scrollView.scrollToView(scrollView.views[i]);
});


var toolbar = Titanium.UI.createView({
	top: 200,
	height: 37,
	opacity: 0,
	left: 10,
	right: 10
});

var floater = Titanium.UI.createView({
	width:320,
	height: 'auto',
	opacity: 0
})

toolbar.add(floater);


floater.add(left);
floater.add(right);

/* END Button TOOLBAR */