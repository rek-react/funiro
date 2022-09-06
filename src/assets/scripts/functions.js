export class Functions {
   static removeClasses(selector, className) {
      selector.forEach((item) => {
         item.classList.remove(className)
      })
   }
   static slideUp(target, duration = 500) {
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
   static slideDown(target, duration = 500) {
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
   static slideToggle(target, duration = 500) {
      if (target.hidden) {
         return this.slideDown(target, duration)
      } else {
         return this.slideUp(target, duration)
      }
   }
   static isMobile() {
      const Android = () => {
         return navigator.userAgent.match(/Android/i)
      }
      const BlackBerry = () => {
         return navigator.userAgent.match(/BlackBerry/i)
      }
      const IOS = () => {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i)
      }
      const Opera = () => {
         return navigator.userAgent.match(/Opera Mini/i)
      }
      const Windows = () => {
         return navigator.userAgent.match(/IEMobile/i)
      }
      return (
         Android() || BlackBerry() || IOS() || Opera() || Windows())
   }
}
