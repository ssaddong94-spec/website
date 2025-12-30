// 1. 헤더 이벤트 (마우스 올리면 서브메뉴 내려오기)
const header = document.querySelector('#header');
if (header) {
    header.addEventListener('mouseenter', () => header.classList.add('open'));
    header.addEventListener('mouseleave', () => header.classList.remove('open'));
}

// 2. 메인 슬라이더 로직
const wrap = document.querySelector('.sliderwrap');
const dots = document.querySelectorAll('.dot');
// 버튼을 지웠으므로 아래 변수들은 null이 될 수 있습니다.
const prevBtn = document.querySelector('.btn_prev');
const nextBtn = document.querySelector('.btn_next');
let idx = 0;

function updateSlider() {
    if (wrap) {
        wrap.style.transform = `translateX(-${idx * 20}%)`;
    }
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) {
        dots[idx].classList.add('active');
    }
}

function nextSlide() { 
    idx = (idx + 1) % 5; 
    updateSlider(); 
}

// 2초마다 자동 슬라이드
let slideInterval = setInterval(nextSlide, 2000);

// [중요] 버튼이 HTML에 있을 때만 이벤트를 실행 (에러 방지)
if (nextBtn) {
    nextBtn.addEventListener('click', () => { 
        nextSlide(); 
        clearInterval(slideInterval); 
        slideInterval = setInterval(nextSlide, 2000); 
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => { 
        idx = (idx - 1 + 5) % 5;
        updateSlider(); 
        clearInterval(slideInterval); 
        slideInterval = setInterval(nextSlide, 2000); 
    });
}

// 3. Swiper (New Releases 섹션)
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2,
    loop: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    speed: 5000,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// 4. 마우스 커서 로고 따라다니는 로직
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// 마우스 좌표 감지
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 부드러운 움직임을 위한 애니메이션 함수
function animateCursor() {
    const speed = 0.12; // 따라오는 속도 (값이 작을수록 부드럽고 느리게 따라옴)
    
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    if (follower) {
        // transform 대신 left/top을 사용하여 좌표 설정
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
    }
    
    // 매 프레임마다 반복 실행
    requestAnimationFrame(animateCursor);
}

// 애니메이션 시작
animateCursor();

// 5. 버튼이나 링크에 마우스 올렸을 때 효과
const interactiveElements = document.querySelectorAll('a, button, .dot, .artist-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (follower) {
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.opacity = '0.7';
            follower.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (follower) {
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.opacity = '1';
        }
    });
});