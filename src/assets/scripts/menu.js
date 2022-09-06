class Menu {
    constructor() {
        this.body = document.body
        this.headerBurger = document.querySelector('.header__burger')
    }
    init() {
        const handleMenu = (e) => {
            const menuHeader = this.headerBurger.parentElement.querySelector('.menu-header')
            this.headerBurger.classList.toggle('_active')
            menuHeader.classList.toggle('_show')
            this.body.classList.toggle('_lock')
        }
        this.headerBurger.addEventListener('click', handleMenu.bind(this))
    }
}

export default new Menu()
