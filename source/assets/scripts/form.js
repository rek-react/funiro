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
