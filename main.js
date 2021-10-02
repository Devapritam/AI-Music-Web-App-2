song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
musicStatus1 = "";

function preload() {
    song1 = loadSound("Unstoppable.mp3");
    song2 = loadSound("harry potter.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    window.alert("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristScore = results[0].pose.keypoints[9].score;

        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY + " rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        console.log("leftwristScore = " + leftWristScore);
    }
}

function draw() {
    image(video, 0, 0, 500, 400);

    fill("#F10000");
    stroke("#F10000");

    musicStatus1 = song1.isPlaying();

    if (leftWristScore >= 0.1) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (musicStatus1 == false) {
            song1.play();
            document.getElementById("songName").innerHTML = "Song Name - Unstoppable";
        }
    }
}