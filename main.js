function onClick(element) {
  document.getElementById('img01').src = element.src
  document.getElementById('modal01').style.display = 'block'
  document.getElementById('caption').innerHTML = element.alt
}

const $tabsToDropdown = $('.tabs-to-dropdown')

function generateDropdownMarkup(container) {
  const $navWrapper = container.find('.nav-wrapper')
  const $navPills = container.find('.nav-pills')
  const firstTextLink = $navPills.find('li:first-child a').text()
  const $items = $navPills.find('li')
  const markup = `
    <div class="dropdown d-md-none">
      <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ${firstTextLink}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
        ${generateDropdownLinksMarkup($items)}
      </div>
    </div>
  `
  $navWrapper.prepend(markup)
}

function generateDropdownLinksMarkup(items) {
  let markup = ''
  items.each(function () {
    const textLink = $(this).find('a').text()
    markup += `<a class="dropdown-item" href="#">${textLink}</a>`
  })

  return markup
}

function showDropdownHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target)
  const $dropdownToggle = $this.find('.dropdown-toggle')
  const dropdownToggleText = $dropdownToggle.text().trim()
  const $dropdownMenuLinks = $this.find('.dropdown-menu a')
  const dNoneClass = 'd-none'
  $dropdownMenuLinks.each(function () {
    const $this = $(this)
    if ($this.text() == dropdownToggleText) {
      $this.addClass(dNoneClass)
    } else {
      $this.removeClass(dNoneClass)
    }
  })
}

function clickHandler(e) {
  e.preventDefault()
  const $this = $(this)
  const index = $this.index()
  const text = $this.text()
  $this.closest('.dropdown').find('.dropdown-toggle').text(`${text}`)
  $this
    .closest($tabsToDropdown)
    .find(`.nav-pills li:eq(${index}) a`)
    .tab('show')
}

function shownTabsHandler(e) {
  // works also
  //const $this = $(this);
  const $this = $(e.target)
  const index = $this.parent().index()
  const $parent = $this.closest($tabsToDropdown)
  const $targetDropdownLink = $parent.find('.dropdown-menu a').eq(index)
  const targetDropdownLinkText = $targetDropdownLink.text()
  $parent.find('.dropdown-toggle').text(targetDropdownLinkText)
}

$tabsToDropdown.each(function () {
  const $this = $(this)
  const $pills = $this.find('a[data-toggle="pill"]')

  generateDropdownMarkup($this)

  const $dropdown = $this.find('.dropdown')
  const $dropdownLinks = $this.find('.dropdown-menu a')

  $dropdown.on('show.bs.dropdown', showDropdownHandler)
  $dropdownLinks.on('click', clickHandler)
  $pills.on('shown.bs.tab', shownTabsHandler)
})

$(function () {
  //button select all or cancel
  $('#select-all').click(function () {
    var all = $('input.select-all')[0]
    all.checked = !all.checked
    var checked = all.checked
    $('input.select-item').each(function (index, item) {
      item.checked = checked
    })
  })

  //button select invert
  $('#select-invert').click(function () {
    $('input.select-item').each(function (index, item) {
      item.checked = !item.checked
    })
    checkSelected()
  })

  //button get selected info
  $('#selected').click(function () {
    var items = []
    $('input.select-item:checked:checked').each(function (index, item) {
      items[index] = item.value
    })
    if (items.length < 1) {
      alert('no selected items!!!')
    } else {
      var values = items.join(',')
      console.log(values)
      var html = $('<div></div>')
      html.html('selected:' + values)
      html.appendTo('body')
    }
  })

  //column checkbox select all or cancel
  $('input.select-all').click(function () {
    var checked = this.checked
    $('input.select-item').each(function (index, item) {
      item.checked = checked
    })
  })

  //check selected items
  $('input.select-item').click(function () {
    var checked = this.checked
    console.log(checked)
    checkSelected()
  })

  //check is all selected
  function checkSelected() {
    var all = $('input.select-all')[0]
    var total = $('input.select-item').length
    var len = $('input.select-item:checked:checked').length
    console.log('total:' + total)
    console.log('len:' + len)
    all.checked = len === total
  }
})

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
)
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

const tableRowTogglers = document.querySelectorAll('.toggle-expand-table')
for(const tableRowToggler of tableRowTogglers) {
  tableRowToggler.addEventListener('click', () => {
    const rowId = tableRowToggler.getAttribute('data-target')
    const tableCellExpendables = document.querySelectorAll(`${rowId} .expandable-cell`)
    for(const tableCellExpandable of tableCellExpendables) {
      tableCellExpandable.classList.toggle('show')
    }
  })
}
