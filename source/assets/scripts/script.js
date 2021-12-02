
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

