class Observer {
    constructor() {
        this.header = document.querySelector('.header')
    }
    init() {
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting) {
                this.header.classList.remove('_fixed')
            } else {
                this.header.classList.add('_fixed')
            }
        }
        const headerObserver = new IntersectionObserver(callback.bind(this))
        headerObserver.observe(this.header)
    }
}
export default new Observer()