function Ronin () {
  const defaultTheme = {
    background: '#222',
    f_high: '#000',
    f_med: '#999',
    f_low: '#ccc',
    f_inv: '#000',
    b_high: '#000',
    b_med: '#888',
    b_low: '#aaa',
    b_inv: '#ffb545'
  }

  this.el = document.createElement('div')
  this.el.id = 'ronin'

  this.theme = new Theme(defaultTheme)

  this.source = new Source(this)
  this.commander = new Commander(this)
  this.surface = new Surface(this)
  this.library = new Library(this)

  this.install = function (host = document.body) {
    this._wrapper = document.createElement('div')
    this._wrapper.id = 'wrapper'

    this.commander.install(this._wrapper)
    this.surface.install(this._wrapper)
    this.el.appendChild(this._wrapper)
    host.appendChild(this.el)
    this.theme.install()

    window.addEventListener('dragover', this.drag)
    window.addEventListener('drop', this.drop)
  }

  this.start = function () {
    this.theme.start()
    this.source.start()
    this.commander.start()
    this.surface.start()

    console.log('Ronin', 'Started')
  }

  this.reset = function () {
    this.theme.reset()
  }

  this.log = function (msg) {
    this.commander.setStatus(msg)
  }

  this.load = function (content = this.default()) {

  }
  // Events

  this.drag = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.drop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (!file || !file.name) { console.warn('File', 'Not a valid file.'); return }
    const path = file.path ? file.path : file.name
    if (path.indexOf('.lisp') > -1) {
      this.source.read(path)
      this.commander.show()
    } else if (file.path) {
      this.commander.injectPath(file.path)
      this.commander.show()
    }
  }
}
