const rotationEl = document.querySelector(".rotation");
const imgWrapEl = rotationEl.querySelector(".imgWrap");

// 左右按钮
const leftEl = rotationEl.querySelector(".left");
const rightEl = rotationEl.querySelector(".right");

const dotsEl = rotationEl.querySelector(".dots");
let dotActiveEl = dotsEl.querySelector(".active")

// 状态和定时器id
let count = 0;
let timeId = 0;

// 鼠标移上点
dotsEl.addEventListener("mouseover", (event) => {
  if (event.target === event.currentTarget || event.target === dotActiveEl) return;
  // 拿到索引
  count = [...dotsEl.children].findIndex(item => item === event.target);
  // 排他
  switchFn("dot");
});

// 左右按钮
leftEl.addEventListener("click", _.throttle(() => switchFn("normal"), 1000, {trailing: false}));
rightEl.addEventListener("click", _.throttle(() => switchFn("back"), 1000, {trailing: false}));

// 鼠标移上停止计时器
// 鼠标离开开启计时器
rotationEl.addEventListener("mouseenter", stopTimer)
rotationEl.addEventListener("mouseleave", startTimer);

function switchFn(mode) {
  switch(mode) {
    case "normal":
      count++
      removeImgWrapper()

      if (count >= 7) {
        count = 0
        handleEndImg()
      };
      break;
    case "back":
      count--;
      removeImgWrapper()

      if (count < 0) { 
        count = 6;
        handleEndImg()
      };
      break;
    case "dot":
      removeImgWrapper()
      break;
    default:
      return;
  }
  
  dotActiveEl.classList.remove("active");
  dotsEl.children[count].classList.add("active");
  dotActiveEl = dotsEl.children[count];
}

startTimer();
function startTimer() {
  if (timeId) return;
  timeId = setInterval(function() {
    switchFn("normal")
  }, 3000);
}
function stopTimer() {
  if (!timeId) return;
  clearInterval(timeId)
  timeId = 0
}

function removeImgWrapper() {
  imgWrapEl.style.transition = "all 1000ms ease";
  imgWrapEl.style.transform = `translate(${-100 * count}%)`;
}

function handleEndImg() {
  setTimeout(() => {
    imgWrapEl.style.transition = "none";
    imgWrapEl.style.transform = `translate(${-count * 100}%)`;
  }, 1000)
}

document.onvisibilitychange = function() {
  if (document.visibilityState === "visible") {
    startTimer()
  } else if (document.visibilityState === "hidden") {
    stopTimer()
  }
}
