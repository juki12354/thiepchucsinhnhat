const correctPass = "0707";
let enteredPass = "";
const dots = document.querySelectorAll(".dot");
const keys = document.querySelectorAll(".key[data-value]");
const deleteKey = document.getElementById("key-del");
const passwordScreen = document.getElementById("password-screen");
const passwordContent = document.querySelector(".password-content");
const mainExperience = document.getElementById("main-experience");
const zodiacScreen = document.getElementById("zodiac-screen");
const zodiacText = document.getElementById("zodiac-text");
const zodiacInstruction = document.getElementById("zodiac-instruction");
const cameraModal = document.getElementById("camera-modal");
const closeCameraBtn = document.getElementById("close-camera");
const cameraUI = document.querySelector(".camera-ui");
let zodiacStep = 1; // Bước 1: chưa hiện chữ, Bước 2: đã hiện chữ
function updateDots() {
  dots.forEach((dot, index) => {
    if (index < enteredPass.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function checkPass() {
  if (enteredPass === correctPass) {
    passwordScreen.style.opacity = "0";
    passwordScreen.style.visibility = "hidden";
    setTimeout(() => {
      passwordScreen.style.display = "none";
      // Bật màn hình chòm sao thay vì màn hình chính
      zodiacScreen.style.display = "flex"; 
    }, 500);
  } else {
    passwordContent.classList.add("shake-content");
    setTimeout(() => {
      passwordContent.classList.remove("shake-content");
      enteredPass = "";
      updateDots();
    }, 500);
  }
}

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    e.stopPropagation();

    popSound.currentTime = 0;
    popSound.play().catch((e) => console.log("Pop sound deferred"));

    if (bgMusic.paused) {
      bgMusic.play().catch((e) => console.log("Music waiting for interaction"));
    }

    if (enteredPass.length < 4) {
      enteredPass += key.getAttribute("data-value");
      updateDots();
      if (enteredPass.length === 4) {
        setTimeout(checkPass, 300);
      }
    }
  });
});

deleteKey.addEventListener("click", (e) => {
  e.stopPropagation();

  popSound.currentTime = 0;
  popSound.play().catch((e) => console.log("Pop sound deferred"));

  if (enteredPass.length > 0) {
    enteredPass = enteredPass.slice(0, -1);
    updateDots();
  }
});

const cake = document.getElementById("cake-clickable");
const candle = document.getElementById("candle-img");
const instruction = document.getElementById("instruction-text");
const popSound = document.getElementById("pop-sound");
const candleSound = document.getElementById("candle-sound");
const fireworkSound = document.getElementById("firework-sound");
const bgMusic = document.getElementById("bg-music");

let state = "initial";

document.addEventListener("click", (e) => {
  if (e.target.id === "candle-img" && state === "lit") return;
  if (e.target.classList.contains("key")) return;

  popSound.currentTime = 0;
  popSound.play().catch((e) => console.log("Audio play deferred"));
});

function updateInstruction(text) {
  if (!instruction) return;
  instruction.classList.remove("bounce-up");
  void instruction.offsetWidth;

  instruction.innerText = text;
  instruction.classList.add("bounce-up");
}

cake.addEventListener("click", (e) => {
  if (state === "initial") {
    candle.classList.add("candle-appearing");
    updateInstruction("Nhấn vào nến để thổi nến");
    state = "lit";
  }
});

const balloons = [
  "asset/balloon/balloon (1).png",
  "asset/balloon/balloon (2).png",
  "asset/balloon/balloon (3).png",
  "asset/balloon/balloon (4).png",
];
const emojis = [
  "❤️",
  "🎂",
  "🥰",
  "💗",
  "✨",
  "🎉",
  "🎁",
  "🎈",
  "💖",
  "⭐",
  "🌈",
  "🍭",
];
const container = document.getElementById("floating-elements");

function spawnCelebration() {
  const burstCount = Math.floor(Math.random() * 2) + 1;

  for (let i = 0; i < burstCount; i++) {
    const isBalloon = Math.random() > 0.4;

    if (isBalloon) {
      const balloon = document.createElement("img");
      balloon.src = balloons[Math.floor(Math.random() * balloons.length)];
      balloon.className = "celebration-item";
      balloon.style.left = Math.random() * 90 + "vw";
      balloon.style.width = Math.random() * 60 + 40 + "px";
      balloon.style.animationDuration = Math.random() * 4 + 6 + "s";
      balloon.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(balloon);

      setTimeout(() => balloon.remove(), 10000);
    } else {
      const emoji = document.createElement("div");
      emoji.className = "floating-emoji";
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 95 + "vw";
      emoji.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";
      emoji.style.animationDuration = Math.random() * 3 + 5 + "s";
      emoji.style.animationDelay = Math.random() * 1 + "s";
      container.appendChild(emoji);

      setTimeout(() => emoji.remove(), 8000);
    }
  }
}

candle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (state === "lit") {
    candleSound.play().catch((e) => console.log("Candle sound deferred"));
    candle.src = "asset/candle_no_fire.png";
    updateInstruction("✨ HAPPY BIRTHDAY! ✨");
    state = "blown";

    for (let i = 0; i < 5; i++) {
      setTimeout(spawnCelebration, i * 200);
    }
    setInterval(spawnCelebration, 400);
    setTimeout(() => {
      const letter = document.getElementById("letter-container");
      letter.classList.add("show");

      setTimeout(() => {
        letter.classList.add("show-text");
      }, 1600);
    }, 3000);
  }
});

const letterContainer = document.getElementById("letter-container");
const modal = document.getElementById("message-modal");
const fireworksContainer = document.getElementById("fireworks-container");
const closeBtn = document.getElementById("close-modal");

function createFirework() {
  const colors = [
    "#ff47a1",
    "#ffc107",
    "#00bcd4",
    "#4caf50",
    "#ffffff",
    "#e91e63",
    "#9c27b0",
    "#ff5722",
    "#00ff00",
    "#ffff00",
    "#00ffff",
  ];
  const x = Math.random() * 100;
  const targetHeight = Math.random() * 50 + 30;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = x + "%";
  rocket.style.setProperty("--target-height", targetHeight + "vh");
  rocket.style.backgroundColor = color;
  rocket.style.boxShadow = `0 0 10px ${color}`;
  fireworksContainer.appendChild(rocket);

  setTimeout(() => {
    rocket.remove();

    const sound = fireworkSound.cloneNode();
    sound.volume = 0.7;
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Firework sound deferred"));

    setTimeout(() => {
      sound.pause();
      sound.remove();
    }, 2000);

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.backgroundColor = color;
      particle.style.left = x + "%";
      particle.style.bottom = targetHeight + "vh";
      particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

      const angle = ((Math.PI * 2) / particleCount) * i;
      const velocity = Math.random() * 200 + 100;
      const dx = Math.cos(angle) * velocity + "px";
      const dy = Math.sin(angle) * velocity + "px";

      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);

      fireworksContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1200);
    }
  }, 1000);
}

let fireworkInterval;

function fireBurst() {
  const count = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < count; i++) {
    setTimeout(createFirework, i * 600);
  }
}

letterContainer.addEventListener("click", () => {
  modal.classList.add("show");
  fireBurst();
  fireworkInterval = setInterval(fireBurst, 2500);
});

// ... (phần code trước đó) ...
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  clearInterval(fireworkInterval);
  // Hiển thị camera sau khi thư đóng
  setTimeout(() => {
    cameraModal.classList.add("show");
  }, 500); 
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    clearInterval(fireworkInterval);
    // Hiển thị camera sau khi thư đóng
    setTimeout(() => {
      cameraModal.classList.add("show");
    }, 500);
  }
});
zodiacScreen.addEventListener("click", () => {
  if (zodiacStep === 1) {
    // Thêm class 'show' để kích hoạt CSS giúp chữ hiện lên từ từ
    zodiacText.classList.add("show");
    
    // Thay đổi dòng chữ hướng dẫn nhỏ ở dưới cùng để báo hiệu bước tiếp theo
    zodiacInstruction.innerText = "Nhấn một lần nữa để mở quà sinh nhật 🎁";
    
    zodiacStep = 2; // Chuyển sang trạng thái đã hiện chữ
  } else if (zodiacStep === 2) {
    // Khi bấm lần thứ 2, làm mờ toàn bộ màn hình chòm sao và vào trang bánh kem
    zodiacScreen.style.opacity = "0";
    zodiacScreen.style.visibility = "hidden";

    setTimeout(() => {
      zodiacScreen.style.display = "none";
      mainExperience.style.display = "block";
      updateInstruction("Nhấn vào bánh để thắp nến");
      
      // Kích hoạt nhạc nền
      if (bgMusic.paused) {
        bgMusic.play().catch((e) => console.log("Music waiting for interaction"));
      }
    }, 500);
  }
});
// Đóng khung camera khi nhấn nút X
closeCameraBtn.addEventListener("click", () => {
  cameraModal.classList.remove("show");
});

// Bạn có thể thêm sự kiện click vào cameraUI ở đây để sau này liên kết tới trang xem album ảnh
// --- KỊCH BẢN ALBUM ẢNH ---
const galleryModal = document.getElementById("gallery-modal");
const galleryImg = document.getElementById("gallery-img");
const closeGalleryBtn = document.getElementById("close-gallery");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const imageCounter = document.getElementById("image-counter");

// BẠN CẬP NHẬT TÊN ẢNH CỦA BẠN VÀO DANH SÁCH NÀY NHÉ:
const images = [
  "asset/img/7.jpg",
  "asset/img/2.jpg",
  "asset/img/3.jpg",
  "asset/img/4.jpg",
  "asset/img/5.jpg",
  "asset/img/6.jpg",
  "asset/img/1.jpg"
  // Bạn có bao nhiêu ảnh thì thêm bấy nhiêu dòng tương tự
];
let currentImgIndex = 0;

// Hàm cập nhật ảnh lên màn hình
function updateGallery() {
  galleryImg.src = images[currentImgIndex];
  imageCounter.innerText = `${currentImgIndex + 1} / ${images.length}`;
}

// Khi click vào icon máy ảnh -> Bật album
cameraUI.addEventListener("click", () => {
  if (images.length > 0) {
    currentImgIndex = 0; // Luôn bắt đầu từ ảnh đầu tiên
    updateGallery();
    
    // Ẩn khung máy ảnh đi để đỡ rối
    cameraModal.classList.remove("show"); 
    
    // Hiện khung album lên
    galleryModal.classList.add("show");
  } else {
    alert("Bạn chưa thêm link ảnh nào vào code!");
  }
});
// Tính năng: Bấm thẳng vào hình ảnh để chuyển sang ảnh tiếp theo
galleryImg.addEventListener("click", () => {
  currentImgIndex = (currentImgIndex + 1) % images.length;
  updateGallery();
});

// --- KỊCH BẢN CHUYỂN TỪ ALBUM SANG TRÁI TIM VŨ TRỤ ---
const heartUniverseScreen = document.getElementById("heart-universe-screen");

closeGalleryBtn.addEventListener("click", () => {
  // Tắt màn hình Album
  galleryModal.classList.remove("show");
  
  // Tắt luôn màn hình bánh sinh nhật phía sau để trống chỗ
  mainExperience.style.display = "none";
  
  // Bật màn hình Trái tim vũ trụ
  heartUniverseScreen.style.display = "block";
  
  // Tạo độ trễ nhỏ 50ms để CSS nhận dạng việc đổi trạng thái display, sau đó mới kích hoạt opacity
  setTimeout(() => {
    heartUniverseScreen.classList.add("fade-in");
    
    // BẮT ĐẦU VẼ TRÁI TIM NGAY KHI MÀN HÌNH HIỆN LÊN
    initHeartUniverse(); 
  }, 50);
});
// ==========================================
// HÀM KHỞI TẠO TRÁI TIM VŨ TRỤ
// ==========================================
function initHeartUniverse() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  const stars = [];
  const heartStars = [];
  const meteors = [];
  const fallingTexts = [];
  
  let mouseX = width / 2;
  let mouseY = height / 2;
  let heartBeat = 1;
  let heartScale = Math.min(width, height) * 0.015;
  
  const messages = [
    "Linh Đan",
    "Em là vũ trụ ",
    "Em là bất tận giữa các vì sao",
    "Em là ngôi sao sáng nhất",
    "Em tỏa sáng nhất bầu trời",
    "Em là ngôi sao cung cử giải xinh gái nhất"
  ];
  
  function heartShape(t, scale = 1) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    return { x: x * scale, y: y * scale };
  }
  
  function createHeartStars(count = 1600) {
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const heart = heartShape(t, heartScale);
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;
  
      const targetX = centerX + heart.x + offsetX;
      const targetY = centerY + heart.y + offsetY;
  
      heartStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX,
        targetY,
        originalX: targetX,
        originalY: targetY,
        size: Math.random() * 3 + 1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        brightness: Math.random() * 0.5 + 0.5,
        hue: Math.random() * 60 + 300,
        mode: 'flying' 
      });
    }
  }
  
  function createBackgroundStars() {
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        brightness: Math.random() * 0.3 + 0.2
      });
    }
  }
  
  function createMeteor() {
    meteors.push({
      x: Math.random() * width,
      y: -50,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 6 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      alpha: 1
    });
  }
  
  function createFallingText() {
    const text = messages[Math.floor(Math.random() * messages.length)];
    const fontSize = Math.random() * 10 + 10;
    ctx.font = `bold ${fontSize}px Pacifico`;
    const textWidth = ctx.measureText(text).width;
    const x = Math.random() * (width - textWidth); 
    fallingTexts.push({
      text, x, y: -10, speed: Math.random() * 2 + 2,
      alpha: 1, fontSize, hue: Math.random() * 360
    });
  }
  
  setInterval(() => { if (Math.random() < 0.8) createFallingText(); }, 2000);
  setInterval(() => { if (Math.random() < 0.7) createMeteor(); }, 3000);
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    heartBeat += 0.1;
  
    stars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const flicker = Math.random() < 0.005 ? 1 : 0;
      const baseOpacity = star.brightness * (0.4 + 0.6 * Math.sin(star.twinkle));
      const opacity = Math.min(1, baseOpacity + flicker);
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = flicker ? 20 : 0;
      ctx.shadowColor = flicker ? '#fff' : 'transparent';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  
    meteors.forEach((m, i) => {
      const dx = Math.cos(m.angle) * m.length;
      const dy = Math.sin(m.angle) * m.length;
      ctx.save();
      ctx.globalAlpha = m.alpha;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - dx, m.y - dy);
      ctx.stroke();
      ctx.restore();
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.alpha -= 0.005;
      if (m.alpha <= 0) meteors.splice(i, 1);
    });
  
    fallingTexts.forEach((t, i) => {
      ctx.save();
      ctx.font = `bold ${t.fontSize}px Pacifico`;
      ctx.fillStyle = `hsla(${t.hue}, 100%, 85%, ${t.alpha})`;
      ctx.shadowBlur = 5;
      ctx.shadowColor = `hsla(${t.hue}, 100%, 70%, ${t.alpha})`;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
      t.y += t.speed;
      t.alpha -= 0.002;
      if (t.y > height + 30 || t.alpha <= 0) fallingTexts.splice(i, 1);
    });
  
    heartStars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const centerX = width / 2;
      const centerY = height / 2 + 20;
  
      if (star.mode === 'flying') {
        const dx = star.targetX - star.x;
        const dy = star.targetY - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 0.07;
        if (dist > 1) { star.x += dx * speed; star.y += dy * speed; } 
        else { star.mode = 'heart'; }
      } else {
        const deltaX = star.originalX - centerX;
        const deltaY = star.originalY - centerY;
        const beatScale = 1 + Math.sin(heartBeat) * 0.05;
        star.x = centerX + deltaX * beatScale;
        star.y = centerY + deltaY * beatScale;
  
        const distanceToMouse = Math.hypot(mouseX - star.x, mouseY - star.y);
        let interactionForce = 0;
        if (distanceToMouse < 100) {
          interactionForce = (100 - distanceToMouse) / 100;
          const angle = Math.atan2(star.y - mouseY, star.x - mouseX);
          star.x += Math.cos(angle) * interactionForce * 10;
          star.y += Math.sin(angle) * interactionForce * 10;
        }
      }
  
      const twinkleOpacity = star.brightness * (0.3 + 0.7 * Math.sin(star.twinkle));
      ctx.save();
      ctx.globalAlpha = twinkleOpacity;
      ctx.fillStyle = `hsl(${star.hue}, 70%, 80%)`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${star.hue}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  
    requestAnimationFrame(animate);
  }
  
  canvas.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  
  canvas.addEventListener('click', (e) => {
    const centerX = width / 2;
    const centerY = height / 2 + 20;
    heartScale *= 1.015;
    heartStars.forEach((star, i) => {
      if (star.mode === 'heart') {
        const t = (i / heartStars.length) * Math.PI * 2;
        const heart = heartShape(t, heartScale);
        const offsetX = (Math.random() - 0.5) * 15;
        const offsetY = (Math.random() - 0.5) * 15;
        star.originalX = centerX + heart.x + offsetX;
        star.originalY = centerY + heart.y + offsetY;
      }
    });
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    heartScale = Math.min(width, height) * 0.015;
    heartStars.length = 0;
    stars.length = 0;
    createHeartStars();
    createBackgroundStars();
  });
  
  createHeartStars();
  createBackgroundStars();
  animate();
}