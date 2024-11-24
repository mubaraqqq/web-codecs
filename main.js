import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const videoInput = document.querySelector('input[name="video-input"]');
const videoEl = document.createElement("video");
const body = document.querySelector("body");

console.log(videoInput);

videoInput.addEventListener("change", (e) => {
  console.log(URL.createObjectURL(e.target.files[0]));

  videoEl.innerHTML = `<source src="${URL.createObjectURL(
    e.target.files[0]
  )}" type="${e.target.files[0].type}" />`;

  videoEl.autoplay = true;
  // videoEl.muted = true;
  videoEl.controls = true;
  videoEl.height = 200;
  videoEl.width = 200;
  body.appendChild(videoEl);
});

videoEl.addEventListener("timeupdate", () => {
  const videoFrame = new VideoFrame(videoEl, {
    timestamp: videoEl.currentTime * 1000,
  });

  console.log(videoFrame);

  videoFrame.close();
});
