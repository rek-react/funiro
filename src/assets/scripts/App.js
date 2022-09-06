import swiper from "./swiper"
import documentActions from "./documentActions"
import dynamicAdapt from "./dynamicAdapt"
import menu from './menu'
import moveBlock from "./moveBlock"
import observer from "./observer"
import spoiler from "./spoiler"
import gallery from "./gallery"


class App {
    init() {
        swiper.init()
        documentActions.init()
        dynamicAdapt.init()
        menu.init()
        moveBlock.init()
        observer.init()
        spoiler.init()
        gallery.init()
    }
}
const app = new App()
app.init()