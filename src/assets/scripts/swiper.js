import Swiper, { Pagination, Navigation } from 'swiper'

class SwiperUser {
   constructor() {
      this.mainSwiperBody = document.querySelector('.main-swiper__body')
      this.swiperRoomsBody = document.querySelector('.swiper-rooms__body')
      this.tipsItems = document.querySelector('.tips__items')
   }
   init() {
      new Swiper(this.mainSwiperBody, {
         watchOverflow: true,
         slidesPerGroup: 1,
         slidesPerView: 1,
         observer: true,
         spaceBetween: 25,
         observeParents: true,
         loop: true,
         modules: [Pagination, Navigation],
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

      new Swiper(this.swiperRoomsBody, {
         watchOverflow: true,
         slidesPerGroup: 1,
         slidesPerView: 'auto',
         spaceBetween: 24,
         observer: true,
         observeParents: true,
         parallax: true,
         modules: [Pagination, Navigation],
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
      new Swiper(this.tipsItems, {
         slidesPerView: 3,
         watchOverflow: true,
         slidesPerGroup: 1,
         observer: true,
         observeParents: true,
         loop: true,
         modules: [Pagination, Navigation],
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
}

export default new SwiperUser()