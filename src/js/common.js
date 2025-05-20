// nav
$(function () {
    $('.nav_list').on('click', '.nav_item', function (e) {
        e.preventDefault();
        $('.nav_list .nav_item').removeClass('on');
        $(this).addClass('on');
        var activeWidth = $(this).innerWidth();
        var itemPos = $(this).position().left;

        $('.slider').css({
            "left": itemPos + "px",
            "width": activeWidth + "px"
        });
    });
});

let rollingSwiper; // Swiper 슬라이드

// 롤링시작 함수
function PlayRollingSwiper(target) {
    rollingSwiper = new Swiper('.rolling_banner', {
        spaceBetween: 0,
        centeredSlides: true,
        speed: 5000,
        autoplay: {
            delay: 1,
        },
        loop: true,
        slidesPerView: 'auto',
        allowTouchMove: false,
        disableOnInteraction: false,
    });
}

// 페이지 로드
window.addEventListener('load', function () {
    PlayRollingSwiper();
});

var Swiper = new Swiper('.spot_title', {
    direction: "vertical",
    loop: true,
    autoplay: {
        delay: 3000,
    },
    disableOnInteraction: false,
})


// gsap.registerPlugin(ScrollTrigger);

// gsap.to('.spot', {
    
//     scrollTrigger: {
    
//     }
// })
