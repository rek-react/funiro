class EditElements {
    async addProduct(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold')
            const file = "assets/files/product.json"
            let response = await fetch(file, {
                method: "GET"
            })
            if (response.ok) {
                let result = await response.json()
                this.loadProducts(result)
                button.classList.remove('_hold')
                button.parentElement.remove()
            } else {
                alert('Ошибка')
            }
        }
    }
    loadProducts(result) {
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

    addCart(button, productId) {
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
            document.body.append(productFly)

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
                    this.updateCart(cartIcon, button, productId)
                    button.classList.remove('_fly')
                }
                button.classList.remove('_hold')

            })

        }
    }
    updateCart(cartIcon, productButton, productId, productAdd = true) {
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
}
export default new EditElements()