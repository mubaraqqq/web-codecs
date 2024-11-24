import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const videoInput = document.querySelector('input[name="video-input"]');
const videoEl = document.createElement("video");
const body = document.querySelector("body");
let frameCounter = 0;

const encoder = new VideoEncoder({
  output(chunk, metadata) {
    const chunkData = new Uint8Array(chunk.byteLength);
    console.log({ chunkData });
    chunk.copyTo(chunkData);

    console.log({ chunk, chunkData });
  },
  error(error) {
    console.log(error);
  },
});

let config = {
  codec: "vp8",
  width: 640,
  height: 480,
  bitrate: 2_000_000, // 2 Mbps
  framerate: 30,
};

encoder.configure(config);

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
  frameCounter = 0;
});

videoEl.addEventListener("timeupdate", () => {
  const videoFrame = new VideoFrame(videoEl, {
    timestamp: videoEl.currentTime * 1000,
  });

  if (encoder.encodeQueueSize > 2) {
    videoFrame.close();
  } else {
    frameCounter++;
    const keyFrame = frameCounter % 150 === 0;
    encoder.encode(videoFrame, { keyFrame });
  }

  console.log(frameCounter);

  videoFrame.close();
});
