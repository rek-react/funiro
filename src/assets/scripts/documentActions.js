import editElements from "./editElements.js"
import { Functions } from "./functions.js"

class DocumentActions {
    init() {
        document.addEventListener('click', documentActions)
        function documentActions(event) {
            const target = event.target
            if (window.innerWidth > 768 && Functions.isMobile()) {
                if (target.closest('.menu-header__arrow')) {
                    target.closest('.menu-header__item').classList.toggle('_hover')
                }
                if (!target.closest('.menu-header__item') && document.querySelectorAll('.menu-header__item._hover')) {
                    Functions.removeClasses(document.querySelectorAll('.menu-header__item._hover'), '_hover')
                }
            }
            if (target.closest('.search-form__icon')) {
                target.closest('.header__body').classList.toggle('_active-search-form')
            } else if (!target.closest('.search-form') && !target.closest('.header__burger') && document.querySelector('.header__body._active-search-form')) {
                document.querySelector('.header__body._active-search-form').classList.remove('_active-search-form')
            }
            if (target.closest('.products__more')) {
                editElements.addProduct(target)
                event.preventDefault()
            }
            if (target.closest('.actions-item__btn')) {
                const productId = target.closest('.item-products').dataset.productid
                editElements.addCart(target, productId)
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
                editElements.updateCart(cartIcon, target, productId, false)
                event.preventDefault()
            }
        }
    }
}
export default new DocumentActions()