const isMobile = {
   Android() {
      return navigator.userAgent.match(/Android/i)
   },
   BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i)
   },
   IOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i)
   },
   Opera() {
      return navigator.userAgent.match(/Opera Mini/i)
   },
   Windows() {
      return navigator.userAgent.match(/IEMobile/i)
   },
   any() {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.IOS() ||
         isMobile.Opera() ||
         isMobile.Windows())
   }
}

function removeClasses(selector, className) {
   selector.forEach((item) => {
      item.classList.remove(className)
   })
}
function _slideUp(target, duration = 500) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = target.offsetHeight + 'px'
      target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      window.setTimeout(() => {
         target.hidden = true
         target.style.removeProperty('height')
         target.style.removeProperty('padding-top')
         target.style.removeProperty('padding-bottom')
         target.style.removeProperty('margin-top')
         target.style.removeProperty('margin-bottom')
         target.style.removeProperty('overflow')
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
      }, duration)
   }
}
function _slideDown(target, duration = 500) {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      if (target.hidden) {
         target.hidden = false
      }
      let height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = 0
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      target.offsetHeight
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = height + 'px'
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      window.setTimeout(() => {
         target.style.removeProperty('height')
         target.style.removeProperty('overflow')
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
      }, duration)
   }
}
function _slideToggle(target, duration = 500) {
   if (target.hidden) {
      return _slideDown(target, duration)
   } else {
      return _slideUp(target, duration)
   }
};
class Spoilers {
   constructor(spoilers) {
      this.spoilers = spoilers
      const spoilersRegular = Array.from(this.spoilers).filter(item => {
         return !item.dataset.spoilers.split(',')[0];
      })
      if (spoilersRegular) {
         this.initSpollers(spoilersRegular)
      }
      const spoilersMedia = Array.from(this.spoilers).filter(item => {
         return item.dataset.spoilers.split(',')[0];
      })
      if (spoilersMedia) {
         this.mediaSpoilers(spoilersMedia)
      }
   }
   mediaSpoilers(spoilersMedia) {
      const breakpointArray = []
      spoilersMedia.forEach(item => {
         const params = item.dataset.spoilers
         const breakpoint = {}
         const paramsArray = params.split(',')
         breakpoint.value = paramsArray[0]
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
         breakpoint.item = item
         breakpointArray.push(breakpoint)
      })
      let mediaQueries = breakpointArray.map(item => {
         return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
      })
      mediaQueries = mediaQueries.filter((item, index, array) => {
         return array.indexOf(item) === index
      })
      mediaQueries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(',')
         const mediaBreakpoint = paramsArray[1]
         const mediaType = paramsArray[2]
         const matchMedia = window.matchMedia(paramsArray[0])
         const spoilerArray = breakpointArray.filter(item => {
            return item.value === mediaBreakpoint && item.type === mediaType
         })
         matchMedia.addEventListener('change', () => {
            this.initSpollers(spoilerArray, matchMedia)
         })
         this.initSpollers(spoilerArray, matchMedia)
      })
   }
   initSpollers(spoilerArray, matchMedia = false) {
      spoilerArray.forEach(spoilerBlock => {
         spoilerBlock = matchMedia ? spoilerBlock.item : spoilerBlock
         if (matchMedia.matches || !matchMedia) {
            spoilerBlock.classList.add('_init')
            spoilerBlock.addEventListener('click', this.setSpoilerAction)
            this.initSpoilerBody(spoilerBlock)
         } else {
            spoilerBlock.classList.remove('_init')
            spoilerBlock.removeEventListener('click', this.setSpoilerAction)
            this.initSpoilerBody(spoilerBlock, false)
         }
      })
   }
   initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
      const spoilerTitles = spoilerBlock.querySelectorAll('[data-spoiler]')
      spoilerTitles.forEach(spoilerTitle => {
         if (hideSpoilerBody) {
            spoilerTitle.removeAttribute('tabindex')
            if (!spoilerTitle.classList.contains('_active')) {
               spoilerTitle.nextElementSibling.hidden = true
            }
         } else {
            spoilerTitle.setAttribute('tabindex', '-1')
            spoilerTitle.nextElementSibling.hidden = false
         }
      })
   }
   setSpoilerAction(event) {
      if (event.target.closest('[data-spoiler]')) {
         const spoilerTitle = event.target.closest('[data-spoiler]')
         const spoilerBlock = spoilerTitle.closest('[data-spoilers]')
         const oneSpoiler = spoilerBlock.hasAttribute('data-one-spoiler') ? true : false
         if (!spoilerBlock.querySelectorAll('._slide').length) {
            if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
               const spoilerActiveTitle = spoilerBlock.parentElement.querySelector('[data-spoiler]._active')
               if (spoilerActiveTitle) {
                  spoilerActiveTitle.classList.remove('_active')
                  _slideUp(spoilerActiveTitle.nextElementSibling, 500)
               }
            }
            spoilerTitle.classList.toggle('_active')
            _slideToggle(spoilerTitle.nextElementSibling, 500)
         }

         event.preventDefault()
      }

   }

}
const spoilersArray = document.querySelectorAll('[data-spoilers]')
if (spoilersArray) {
   new Spoilers(spoilersArray)
}

;


"use strict";

function DynamicAdapt(type) {
   this.type = type;
}

DynamicAdapt.prototype.init = function () {
   const _this = this;
   // массив объектов
   this.оbjects = [];
   this.daClassname = "_dynamic_adapt_";
   // массив DOM-элементов
   this.nodes = document.querySelectorAll("[data-da]");

   // наполнение оbjects объктами
   for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
   }

   this.arraySort(this.оbjects);

   // массив уникальных медиа-запросов
   this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
   }, this);
   this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
   });

   // навешивание слушателя на медиа-запрос
   // и вызов обработчика при первом запуске
   for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
         return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
         _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
   }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
   if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
   } else {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
         }
      }
   }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
   element.classList.add(this.daClassname);
   if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
   }
   if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
   }
   destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
   element.classList.remove(this.daClassname);
   if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
   } else {
      parent.insertAdjacentElement('beforeend', element);
   }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
   if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return -1;
            }

            if (a.place === "last" || b.place === "first") {
               return 1;
            }

            return a.place - b.place;
         }

         return a.breakpoint - b.breakpoint;
      });
   } else {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return 1;
            }

            if (a.place === "last" || b.place === "first") {
               return -1;
            }

            return b.place - a.place;
         }

         return b.breakpoint - a.breakpoint;
      });
      return;
   }
};

const da = new DynamicAdapt("max");
da.init();;
class Form {
   constructor(forms) {
      this.forms = forms
      this.requery(this.forms)
   }
   requery(forms) {
      forms.forEach(form => {
         this.inputReqs = form.querySelectorAll('#req')
         this.btn = form.querySelector('button[type="submit"]')
         this.submitForm(this.btn, this.inputReqs)
      })

   }
   submitForm(btn, inputReqs) {
      inputReqs.forEach(inputReq => {
         btn.addEventListener('click', (event) => {
            if (inputReq.value === '') {
               this.addError(inputReq)
               event.preventDefault()
            }
         })
         inputReq.addEventListener('focus', () => {
            this.removeError(inputReq)
         })
      })
   }
   addError(inputReq) {
      if (!inputReq.classList.contains('_error')) {
         inputReq.classList.add('_error')
         var classError = 'error'
         var textError = 'Заполните поле'
         var errorGroup = inputReq.parentElement
         errorGroup.insertAdjacentHTML(
            'beforeend',
            '<div class="' + classError + '">' + textError + '</div>'
         )
      }
   }
   removeError(inputReq) {
      if (inputReq.classList.contains('_error')) {
         inputReq.classList.remove('_error')
         inputReq.parentElement.querySelector('.error').remove()
      }
   }
}
const formMain = document.querySelectorAll('#form')
if (formMain) {
   new Form(formMain)
}
;

const BODY = document.body

const headerBurger = document.querySelector('.header__burger')
headerBurger.addEventListener('click', () => {
   const menuHeader = headerBurger.parentElement.querySelector('.menu-header')
   headerBurger.classList.toggle('_active')
   menuHeader.classList.toggle('_show')
   BODY.classList.toggle('_lock')
})


document.addEventListener('DOMContentLoaded', () => {
   document.addEventListener('click', documentActions)
   function documentActions(event) {
      const target = event.target
      if (window.innerWidth > 768 && isMobile.any()) {
         if (target.closest('.menu-header__arrow')) {
            target.closest('.menu-header__item').classList.toggle('_hover')
         }
         if (!target.closest('.menu-header__item') && document.querySelectorAll('.menu-header__item._hover')) {
            removeClasses(document.querySelectorAll('.menu-header__item._hover'), '_hover')
         }
      }
      if (target.closest('.search-form__icon')) {
         target.closest('.header__body').classList.toggle('_active-search-form')
      } else if (!target.closest('.search-form') && !target.closest('.header__burger') && document.querySelector('.header__body._active-search-form')) {
         document.querySelector('.header__body._active-search-form').classList.remove('_active-search-form')
      }
      if (target.closest('.products__more')) {
         addProduct(target)
         event.preventDefault()
      }
      if (target.closest('.actions-item__btn')) {
         const productId = target.closest('.item-products').dataset.productid
         addCart(target, productId)
         event.preventDefault()
      }
      if (target.closest('.cart-header__cart')) {
         if (document.querySelector('.list-cart__item')) {
            document.querySelector('.cart-header__body').classList.toggle('_active')
         }
         event.preventDefault()
      } else if (!target.closest('.cart-header') && !target.closest('.actions-item__btn')) {
         document.querySelector('.cart-header__body').classList.remove('_active')
      }
      if (target.closest('.list-cart__delete')) {
         const productId = target.closest('.list-cart__item').dataset.cartProductid
         const cartIcon = target.closest('.cart-header').querySelector('.cart-header__cart')
         updateCart(cartIcon, target, productId, false)
         event.preventDefault()
      }
   }
   const header = document.querySelector('.header')
   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         header.classList.remove('_fixed')
      } else {
         header.classList.add('_fixed')
      }
   }
   const headerObserver = new IntersectionObserver(callback)
   headerObserver.observe(header)

   async function addProduct(button) {
      if (!button.classList.contains('_hold')) {
         button.classList.add('_hold')
         const file = "assets/json/product.json"
         let response = await fetch(file, {
            method: "GET"
         })
         if (response.ok) {
            let result = await response.json()
            loadProducts(result)
            button.classList.remove('_hold')
            button.parentElement.remove()
         } else {
            alert('Ошибка')
         }
      }
   }
   function loadProducts(result) {
      const productsBody = document.querySelector('.products__body')

      result.products.forEach(item => {
         const itemId = item.id
         const itemUrl = item.url
         const itemImage = item.image
         const itemTitle = item.title
         const itemText = item.text
         const itemLabels = item.labels
         const itemPrice = item.price
         const itemPriceOld = item.priceOld
         const itemShareUrl = item.shareUrl
         const itemLikeUrl = item.likeUrl

         let productColStart = `<div class="products__col">`
         let productColEnd = `</div>`

         let productTemplateStart = `<div class="products__item item-products" data-productId="${itemId}">`
         let productTemplateEnd = `</div>`

         let productTemplateHeaderStart = `<a href="${itemUrl}" class="item-products__header">`
         let productTemplateHeaderEnd = `</a>`

         let productTemplateLabels = ''
         if (itemLabels) {
            let productTemplateLabelsStart = `<div class="item-products__labels">`
            let productTemplateLabelsEnd = `</div>`

            let productTemplateLabelsContent = ''

            itemLabels.forEach(label => {
               productTemplateLabelsContent += `<div class="item-products__label item-products__label_${label.type}">${label.value}</div>`
            })

            productTemplateLabels += productTemplateLabelsStart
            productTemplateLabels += productTemplateLabelsContent
            productTemplateLabels += productTemplateLabelsEnd
         }

         let productTemplateImage = `
         <div class="item-products__image bg">
            <img src="assets/images/products/${itemImage}" alt="">
         </div>`

         let productTemplateBodyStart = `<div class="item-products__body">`
         let productTemplateBodyEnd = `</div>`

         let productTemplateContent = `
         <div class="item-products__content">
            <a href="${itemUrl}" class="item-products__title">${itemTitle}</a>
            <div class="item-products__text">
               ${itemText}
            </div>
         </div>`


         let productTemplatePrices = ''
         let productTemplatePricesStart = `<div class="item-products__prices">`
         let productTemplatePricesCurrent = `<div class="item-products__price">Rp ${itemPrice}</div>`
         let productTemplatePricesOld = ` <div class="item-products__price-old">Rp ${itemPriceOld}</div>`
         let productTemplatePricesEnd = `</div>`

         productTemplatePrices += productTemplatePricesStart
         productTemplatePrices += productTemplatePricesCurrent
         if (itemPriceOld) {
            productTemplatePrices += productTemplatePricesOld
         }

         productTemplatePrices += productTemplatePricesEnd


         let productTemplateActions = `
         <div class="item-products__actions actions-item">
            <div class="actions-item__body">
               <a href="#" class="actions-item__btn btn btn-white">Add to cart</a>
               <a href="${itemShareUrl}" class="actions-item__link icon-share">Share</a>
               <a href="${itemLikeUrl}" class="actions-item__link icon-favorite">Like</a>
            </div>
         </div>
         `


         let productTemplateHeader = ''
         productTemplateHeader += productTemplateHeaderStart
         productTemplateHeader += productTemplateLabels
         productTemplateHeader += productTemplateImage
         productTemplateHeader += productTemplateHeaderEnd


         let productTemplateBody = ''
         productTemplateBody += productTemplateBodyStart
         productTemplateBody += productTemplateContent
         productTemplateBody += productTemplatePrices
         productTemplateBody += productTemplateActions
         productTemplateBody += productTemplateBodyEnd


         let productTemplate = ''
         productTemplate += productTemplateStart
         productTemplate += productTemplateHeader
         productTemplate += productTemplateBody
         productTemplate += productTemplateEnd

         let productCol = ''
         productCol += productColStart
         productCol += productTemplate
         productCol += productColEnd

         productsBody.insertAdjacentHTML('beforeend', productCol)
      });
   }

   function addCart(button, productId) {
      if (!button.classList.contains('_hold')) {
         button.classList.add('_hold')
         button.classList.add('_fly')

         const cartIcon = document.querySelector('.cart-header__cart')
         const product = document.querySelector(`[data-productid="${productId}"]`)
         const productImage = product.querySelector('.item-products__image')

         const productFly = productImage.cloneNode(true)

         const productFlyWidht = productImage.offsetWidth
         const productFlyHeight = productImage.offsetHeight
         const productFlyLeft = productImage.getBoundingClientRect().left
         const productFlyTop = productImage.getBoundingClientRect().top

         productFly.setAttribute('class', 'fly-image bg')

         productFly.style.cssText = `
            width:${productFlyWidht}px;
            height:${productFlyHeight}px;
            left:${productFlyLeft}px;
            top:${productFlyTop}px;
         `
         BODY.append(productFly)

         const cartIconLeft = cartIcon.getBoundingClientRect().left
         const cartIconTop = cartIcon.getBoundingClientRect().top

         productFly.style.cssText = `
            width:0px;
            height:0px;
            left:${cartIconLeft}px;
            top:${cartIconTop}px;
         `

         productFly.addEventListener('transitionend', () => {
            if (button.classList.contains('_fly')) {
               productFly.remove()
               updateCart(cartIcon, button, productId)
               button.classList.remove('_fly')
            }
            button.classList.remove('_hold')

         })

      }
   }
   function updateCart(cartIcon, productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header__body')
      const cartProduct = cart.querySelector(`[data-cart-productid="${productId}"]`)
      const cartQuantity = cartIcon.querySelector('span')
      if (productAdd) {
         const cartProductList = document.querySelector('.list-cart')
         const product = document.querySelector(`[data-productid="${productId}"]`)
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML
         } else {
            cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>')
         }
         if (!cartProduct) {
            const cartProductTitle = product.querySelector('.item-products__title')
            const cartProductImage = product.querySelector('.item-products__image')
            const cartProductImageUrl = cartProductImage.parentElement.getAttribute('href')
            const cartProductTitleUrl = cartProductTitle.getAttribute('href')

            const cartContentProduct = `
            <a href="${cartProductImageUrl}" class="list-cart__image bg">${cartProductImage.innerHTML}</a>
            <div class="list-cart__body">
               <a href="${cartProductTitleUrl}" class="list-cart__title">${cartProductTitle.innerHTML}</a>
               <div class="list-cart__quantity">Quantity: <span>1</span></div>
               <a href="#" class="list-cart__delete">Delete</a>
            </div>
            `
            cartProductList.insertAdjacentHTML('beforeend', `
            <li class="list-cart__item" data-cart-productid="${productId}">${cartContentProduct}</li>
            `
            )
         } else {
            const cartProductQuantity = cartProduct.querySelector('.list-cart__quantity span')
            cartProductQuantity.textContent = ++cartProductQuantity.textContent
         }
      } else {
         const cartProductQuantity = cartProduct.querySelector('.list-cart__quantity span')
         cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML
         if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove()
         }
         const cartQuantityValue = --cartQuantity.innerHTML

         if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue
         } else {
            cartQuantity.remove()
            cart.classList.remove('_active')
         }
      }

   }

   const funiro = document.querySelector('.funiro__body')
   if (funiro && !isMobile.any()) {
      const funiroColumns = funiro.querySelectorAll('.funiro__col')
      const speed = funiro.dataset.speed
      let positionX = 0
      let coordXprocent = 0
      function SetMouseGallery() {
         let funiroItemsWidth = 0
         funiroColumns.forEach(item => {
            funiroItemsWidth += item.offsetWidth
         })
         let funiroDifferent = funiroItemsWidth - funiro.offsetWidth
         let distX = Math.floor(coordXprocent - positionX)
         positionX = positionX + (distX * speed)
         let position = funiroDifferent / 200 * positionX

         funiro.style.cssText = `transform: translate3d(${-position}px,0,0);`

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(SetMouseGallery)
         } else {
            funiro.classList.remove('_init')
         }
      }
      funiro.addEventListener('mousemove', e => {
         let funiroWidth = funiro.offsetWidth

         let coordX = e.pageX - funiroWidth / 2
         coordXprocent = coordX / funiroWidth * 200
         if (!funiro.classList.contains('_init')) {
            requestAnimationFrame(SetMouseGallery)
            funiro.classList.add('_init')
         }
      })
   }
})


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

if (document.querySelector('.gallery')) {
   const slider = new Gallery(document.querySelector('.gallery'), {
      mouse: true,
   });
}