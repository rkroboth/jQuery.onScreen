# jQuery.onScreen

Jquery plugin to execute your custom function when an element appears on the viewable part of the user's screen, either when the page loads or as the user scrolls.

Usage:

Use default options:
```
$("#your-element").onScreen(callback);
```

Customize the options:
```
$("#your-element").onScreen(callback, options);
```

Example:

```
// Here is your custom callback that executes when the element appears on the viewable part of the screen as the user scrolls down or when the page first loads.
let callback = function(){
	console.log("running my callback");
	$(this).css("border", "1px solid red");
}

// Here are your options.  These are the defaults, and the options param is not required if you want to just use the default.
let options = {

	// Wait this long to start the plugin until after the page loads.  So that any elements that are on the screen
	// when the page first loads have a small delay before the callback is executed.
	delayStart: 500,

	// When the this percent of the element (percentOfElementOnScreen) is on the viewable screen,
	// OR this percent of the screen (percentOfScreenFilled) is covered by the element,
	// then the callback function will run.
	percentOfElementOnScreen: 95,
	percentOfScreenFilled: 100,

	// When the user is scrolling, wait this long for the user to stop scrolling until we check to see if the element is on the screen.
	stopScrollDelay: 10,
	
	// Run the callback function only once, the first time the element appears on the page.
	// Changing this to false will run the callback repeatedly everytime the user scrolls and the element is still on the screen.
	runOnce: true,
};

// Here you attach the callback to a specific element using Jquery

$("#your-element").onScreen(callback, options);
```


