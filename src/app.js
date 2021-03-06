import './styles/app.css'
import 'normalize.css'

class SearchInput {
  constructor () {
    this.searchInput = document.querySelector('.header__search-input')
    this.searchContainer = document.querySelector('.header__search-container')
    this.resetButton = document.querySelector('.header__reset-input-btn')

    this.initListeners()
  }

  initListeners () {
    this.searchInput.addEventListener('focus', this.extendInput.bind(this))
    this.searchInput.addEventListener('blur', this.uncheck.bind(this))

    this.resetButton.addEventListener('click', this.resetInput.bind(this))
  }

  extendInput () {
    this.searchContainer.classList.add('header__search-container_focused')
    this.searchInput.classList.add('header__search-input_focused')
    this.resetButton.classList.remove('header__reset-input-btn_hidden')
  }

  uncheck () {
    // The reset input button toggles the 'blur' event, which is not desirable
    // I am giving time for the input to refocus
    setTimeout(() => {
      if (document.activeElement !== this.searchInput) {
        this.resetButton.classList.add('header__reset-input-btn_hidden')
        this.searchContainer.classList.remove('header__search-container_focused')
        this.searchInput.classList.remove('header__search-input_focused')
      }
    }, 200)
  }

  resetInput () {
    this.searchInput.value = ''
    this.searchInput.focus()
  }
}

// eslint-disable-next-line no-new
new SearchInput()
