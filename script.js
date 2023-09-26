window.onload = function () {
  let loader = document.querySelector(".loader");
  loader.remove();
};
//smooth scroll
const lenis = new Lenis()
lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
// canvas start here
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  let k = "";
  for (let i = 1; i <= 300; i++) {
    let count = "000";
    if (i > 9) {
      count = "00";
    }
    if (i > 99) {
      count = "0";
    }
    k += `./img/male${count}${i}.png\n`;
  }
  var data = `${k}`;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}
console.log(images);
gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  duration: 0.3,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `.page>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `body`,
  },
  onUpdate: render,
});
console.log(imageSeq.frame);
images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: ".page>canvas",
  // markers:true,
  scroller: `body`,
  //   set start end according to preference
  start: `top top`,
  end: `600% top`,
});

// scrollTriger Start here
gsap.to(".page1", {
  scrollTrigger: {
    scroller: "body",
    trigger: ".page1",
    pin: true,
    start: "top top",
    end: "bottom top",
  },
});
gsap.to(".page2", {
  scrollTrigger: {
    scroller: "body",
    trigger: ".page2",
    pin: true,
    start: "top top",
    end: "bottom top",
  },
});
gsap.to(".page3", {
  scrollTrigger: {
    trigger: ".page3",
    start: "top top",
    end: "bottom bottom",
    pin: true,
  },
});

ScrollTrigger.create({
  trigger: '.allAvatars',
  start: 'top top', // Adjust this as needed
  end: 'bottom center', // Adjust this as needed
  onEnter: () => {
    // Change the navbar's  color when the section enters the viewport
    gsap.to('header', { color: 'var(--black)', duration: 0.2 });
    gsap.to('header svg', { fill: 'var(--black)', duration: 0.2 });
  },
  onLeaveBack: () => {
    // Change the navbar's  color back to the initial color when the section leaves the viewport
    gsap.to('header', { color: 'var(--white)', duration: 0.2 });
    gsap.to('header svg', { fill: 'var(--white)', duration: 0.2 });
  },
});
ScrollTrigger.create({
  trigger: '.c-roadmap',
  start: 'top top', // Adjust this as needed
  end: 'bottom center', // Adjust this as needed
  onEnter: () => {
    // Change the navbar's  color when the section enters the viewport
    gsap.to('header', { color: 'var(--white)', duration: 0.2 });
    gsap.to('header svg', { fill: 'var(--white)', duration: 0.2 });
    
  },
  onLeaveBack: () => {
    // Change the navbar's  color back to the initial color when the section leaves the viewport
    gsap.to('header', { color: 'var(--black)', duration: 0.2 });
    gsap.to('header svg', { fill: 'var(--black)', duration: 0.2 });
  },
});



