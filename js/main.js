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

//Play when ready
video.addEventListener(
  "canplay",
  (e) => {
    if (!streaming) {
      //Set video / canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);

      streaming = true;
    }
  },
  false
);

photoButton.addEventListener(
  "click",
  (e) => {
    takePicture();
    e.preventDefault();
  },
  false
);

photoFilter.addEventListener("change", (e) => {
  // Change filter to choosen option
  filter = e.target.value;
  //Set filter to video
  video.style.filter = filter;
  e.preventDefault();
});

const takePicture = () => {
  //Create canvas
  const context = canvas.getContext("2d");
  if (width && height) {
    //Set canvas props
    canvas.width = width;
    canvas.height = height;
    //Draw image of the video on the canvas
    context.filter = filter;
    context.drawImage(video, 0, 0, width, height);

    //Create image from the canvas => Base64
    const imgUrl = canvas.toDataURL("image/png");
  }
};
