//Global vars
let width = 500,
  height = 0,
  filter = "none",
  streaming = false;

//DOM
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

//Get media stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    //Link to the video source
    video.srcObject = stream;
    //Play video
    video.play();
  })
  .catch((err) => {
    console.log("err", err);
  });
