import { Functions } from './functions'

class MoveBlock {
    constructor() {
        this.funiro = document.querySelector('.funiro__body')
    }
    init() {
        if (!Functions.isMobile()) {
            const funiroColumns = this.funiro.querySelectorAll('.funiro__col')
            const speed = this.funiro.dataset.speed
            let positionX = 0
            let coordXprocent = 0
            const SetMouseGallery = () => {
                let funiroItemsWidth = 0
                funiroColumns.forEach(item => {
                    funiroItemsWidth += item.offsetWidth
                })
                let funiroDifferent = funiroItemsWidth - this.funiro.offsetWidth
                let distX = Math.floor(coordXprocent - positionX)
                positionX = positionX + (distX * speed)
                let position = funiroDifferent / 200 * positionX

                this.funiro.style.cssText = `transform: translate3d(${-position}px,0,0);`

                if (Math.abs(distX) > 0) {
                    requestAnimationFrame(SetMouseGallery)
                } else {
                    this.funiro.classList.remove('_init')
                }
            }
            const handleMouseMove = (e) => {
                let funiroWidth = this.funiro.offsetWidth

                let coordX = e.pageX - funiroWidth / 2
                coordXprocent = coordX / funiroWidth * 200
                if (!this.funiro.classList.contains('_init')) {
                    requestAnimationFrame(SetMouseGallery)
                    this.funiro.classList.add('_init')
                }
            }
            this.funiro.addEventListener('mousemove', handleMouseMove.bind(this))
        }
    }
}
export default new MoveBlock()