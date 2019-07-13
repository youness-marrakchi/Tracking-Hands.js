console.log('hello world');

// bunch of optional parameters for the model
const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}


navigator.getUserMedia =
	navigator.getUserMedia || 
	navigator.oGetUserMedia || 
	navigator.msGetUserMedia || 
	navigator.mozGetUserMedia || 
	navigator.webkitGetUserMedia;

// selecting from the body
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;


handTrack.startVideo(video).then(status => {
	if(status) {
		// stream is just the passed in information from the webcam
		navigator.getUserMedia({video: {}}, stream => {
			video.srcObject = stream;
			//running a detection every 1 second
			setInterval(runDetection, 1000);
		},
			err => console.log(err)
		);
	}
});

function runDetection() {
	model.detect(video).then(predictions => {
		console.log(predictions);
		// displaying the detector
		model.renderPredictions(predictions, canvas, context, video);
		if (predictions.length > 0) {
			//output an alarm
			audio.play();
		}
	});
}


handTrack.load(modelParams).then(lmodel => {
	model = lmodel;
});
