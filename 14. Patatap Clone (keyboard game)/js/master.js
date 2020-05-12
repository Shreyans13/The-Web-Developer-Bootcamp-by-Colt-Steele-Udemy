var data = {
			q: {
				sound: new Howl({
		  		src : ['sounds/bubbles.mp3']
				}),
				color: '#1abc9c'
			},
			w: {
				sound: new Howl({
		  		src : ['sounds/clay.mp3']
				}),
				color: '#2ecc71'
			},
			e: {
				sound: new Howl({
		  		src : ['sounds/confetti.mp3']
				}),
				color: '#3498db'
			},
			r: {
				sound: new Howl({
		  		src : ['sounds/corona.mp3']
				}),
				color: '#9b59b6'
			},
				t: {
				sound: new Howl({
		  		src : ['sounds/dotted-spiral.mp3']
				}),
				color: '#34495e'
			},
			y: {
				sound: new Howl({
		  		src : ['sounds/flash-1.mp3']
				}),
				color: '#16a085'
			},
			u: {
				sound: new Howl({
		  		src : ['sounds/flash-2.mp3']
				}),
				color: '#27ae60'
			},
			i: {
				sound: new Howl({
		  		src : ['sounds/flash-3.mp3']
				}),
				color: '#2980b9'
			},
			o: {
				sound: new Howl({
					src : ['sounds/glimmer.mp3']
				}),
				color: '#8e44ad'
			},
			p: {
				sound: new Howl({
		  		src : ['sounds/moon.mp3']
				}),
				color: '#2c3e50'
			},
			a: {
				sound: new Howl({
		  		src : ['sounds/pinwheel.mp3']
				}),
				color: '#f1c40f'
			},
			s: {
				sound: new Howl({
		  		src : ['sounds/piston-1.mp3']
				}),
				color: '#e67e22'
			},
			d: {
				sound: new Howl({
		  		src : ['sounds/piston-2.mp3']
				}),
				color: '#e74c3c'
			},
			f: {
				sound: new Howl({
		  		src : ['sounds/prism-1.mp3']
				}),
				color: '#95a5a6'
			},
			g: {
				sound: new Howl({
		  		src : ['sounds/prism-2.mp3']
				}),
				color: '#f39c12'
			},
			h: {
				sound: new Howl({
		  		src : ['sounds/prism-3.mp3']
				}),
				color: '#d35400'
			},
			j: {
				sound: new Howl({
		  		src : ['sounds/splits.mp3']
				}),
				color: '#1abc9c'
			},
			k: {
				sound: new Howl({
		  		src : ['sounds/squiggle.mp3']
				}),
				color: '#2ecc71'
			},
			l: {
				sound: new Howl({
		  		src : ['sounds/strike.mp3']
				}),
				color: '#3498db'
			},
			z: {
				sound: new Howl({
		  		src : ['sounds/suspension.mp3']
				}),
				color: '#9b59b6'
			},
			x: {
				sound: new Howl({
		  		src : ['sounds/timer.mp3']
				}),
				color: '#34495e'
			},
			c: {
				sound: new Howl({
		  		src : ['sounds/ufo.mp3']
				}),
				color: '#16a085'
			},
			v: {
				sound: new Howl({
		  		src : ['sounds/veil.mp3']
				}),
				color: '#27ae60'
			},
			b: {
				sound: new Howl({
		  		src : ['sounds/wipe.mp3']
				}),
				color: '#2980b9'
			},
			n: {
				sound: new Howl({
					src : ['sounds/zig-zag.mp3']
				}),
				color: '#8e44ad'
			},
			m: {
				sound: new Howl({
		  		src : ['sounds/moon.mp3']
				}),
				color: '#2c3e50'
			}
		}
		var circles = [];

		function onKeyDown(event) {
			var sound = new Howl({
		    	src: ['sounds/bubbles.mp3']
		    });
			var maxPoint = new Point(view.size.width, view.size.height);
			var randomPoint = Point.random();
			var otherPoint = maxPoint * randomPoint;
			var newCircle = new Path.Circle(otherPoint, 300);
			newCircle.fillColor = data[event.key].color;
			data[event.key].sound.play();
			// newCircle.fillColor = "orange";
			circles.push(newCircle);
			// sound.play()
			
		}

// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	justification: 'center',
	fontSize: 30,
	fillColor: 'white'
});

// Define a random point in the view, which we will be moving
// the text item towards.
var destination = Point.random() * view.size;

		var animateCircle = new Path.Circle(new Point(300 ,300), 100)
		animateCircle.fillColor = "red"
		function onFrame(event) {
			for (var i = 0; i < circles.length; i++) {
				circles[i].fillColor.hue += 1;
				circles[i].scale(0.9)
			}
			animateCircle.fillColor.hue += 1;
			animateCircle.scale(0.9)





			// Each frame, move the path 1/30th of the difference in position
	// between it and the destination.
	
	// The vector is the difference between the position of
	// the text item and the destination point:
	var vector = destination - text.position;
	
	// We add 1/30th of the vector to the position property
	// of the text item, to move it in the direction of the
	// destination point:
	text.position += vector / 30;
	
	// Set the content of the text item to be the length of the vector.
	// I.e. the distance it has to travel still:
	text.content = "Shreyans Jain"
	
	// If the distance between the path and the destination is less
	// than 5, we define a new random point in the view to move the
	// path to:
	if (vector.length < 5) {
		destination = Point.random() * view.size;
	}
		}