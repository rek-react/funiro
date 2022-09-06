import { Functions } from './functions.js'
class Spoilers {
   constructor() {
      this.spoilers = document.querySelectorAll('[data-spoilers]')

   }
   init() {
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
                  Functions.slideUp(spoilerActiveTitle.nextElementSibling, 500)
               }
            }
            spoilerTitle.classList.toggle('_active')
            Functions.slideToggle(spoilerTitle.nextElementSibling, 500)
         }

         event.preventDefault()
      }

   }

}


export default new Spoilers()