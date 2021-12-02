if (document.querySelector('.main-swiper__body')) {
   new Swiper('.main-swiper__body', {
      watchOverflow: true,
      // allowTouchMove: false,
      slidesPerGroup: 1,
      slidesPerView: 1,
      observer: true,
      spaceBetween: 25,
      observeParents: true,
      loop: true,
      loopedSlides: 3,
      observeSlideChildren: true,
      pagination: {
         el: '.controls-swiper__dotts',
         clickable: true,
      },
      navigation: {
         prevEl: '.arrows-main-swiper__arrow_prev',
         nextEl: '.arrows-main-swiper__arrow_next',
      },
      breakpoints: {
         320: {
            spaceBetween: 55,
         },
         992: {
            spaceBetween: 25,
         }

      }

   })
}

if (document.querySelector('.swiper-rooms__body')) {
   new Swiper('.swiper-rooms__body', {
      watchOverflow: true,
      slidesPerGroup: 1,
      slidesPerView: 'auto',
      spaceBetween: 24,
      observer: true,
      observeParents: true,
      parallax: true,
      loop: true,
      observeSlideChildren: true,
      pagination: {
         el: '.swiper-rooms__dotts',
         clickable: true,
      },
      navigation: {
         prevEl: '.arrows-rooms-swiper__arrow_prev',
         nextEl: '.arrows-rooms-swiper__arrow_next',
      },
      breakpoints: {
         320: {
            spaceBetween: 17,
            slidesPerView: 1,
         },
         525: {
            spaceBetween: 30,
            slidesPerView: 1.2,
         },
         992: {
            slidesPerView: 'auto',
            spaceBetween: 24,
         }
      }
   })
}
if (document.querySelector('.tips__items')) {
   new Swiper('.tips__items', {
      slidesPerView: 3,
      watchOverflow: true,
      slidesPerGroup: 1,
      observer: true,
      observeParents: true,
      loop: true,
      spaceBetween: 32,
      observeSlideChildren: true,
      pagination: {
         el: '.tips__dotts',
         clickable: true,
      },
      navigation: {
         prevEl: '.arrows-tips-swiper__arrow_prev',
         nextEl: '.arrows-tips-swiper__arrow_next',
      },
      breakpoints: {
         320: {
            spaceBetween: 17,
            slidesPerView: 1,
         },
         525: {
            spaceBetween: 20,
            slidesPerView: 2,
         },
         768: {
            slidesPerView: 2.6,
            spaceBetween: 25,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 32,
         }
      }
   })
}