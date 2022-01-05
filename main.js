song="";
song_2="";

leftWristx=0;
leftWristy=0;

rightWristx=0;
rightWristy=0;

scoreleftWrist=0;

song_1="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();


    video=createCapture(VIDEO);
    video.hide();


    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses); 
}

function draw(){
    image(video,0,0,600,500);
    fill("#005A9C");
    stroke("#005A9C");
    song_1 = song.isPlaying();
    console.log(song_1);
    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,20);
        song_2.stop();
    if(song_1 == false){
        song.play();
        document.getElementById("song_id").innerHTML = "Song name: Peter Pan Song";
      }
    }
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx= "+ leftWristx +" "+ "leftWristy= " + leftWristy);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWrisx=  "+ rightWristx +" "+ "rightWristy= " + rightWristy);
    }
}

function preload(){
    song=loadSound("music.mp3");
    song_2=loadSound("music2.mp3");
}