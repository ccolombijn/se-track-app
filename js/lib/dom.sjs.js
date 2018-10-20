'use strict'
function $createElement (element) {
  let element_
  if (element.indexOf('.') > 0) element_ = element.split('.')[0]
  if (element.indexOf('#') > 0) element_ = element.split('#')[0]
  let new_element = document.createElement(element_)

  if (element.indexOf('.') > 0) new_element.setAttribute('class', element.split('.')[1])
  if (element.indexOf('#') > 0) new_element.setAttribute('id', element.split('.')[0].split('#')[1])

  return new_element
}

function $setElement (element, str, target) {
  let target_element = document.querySelector(target)
  let element_ = $createElement(element)
  element_.innerHTML = str
  let _element = $createElement(element)
  _element.appendChild(element_)
  target_element.innerHTML = _element.innerHTML
  return target_element
}

function $setHTML (target, str) {
  let element = document.querySelector(target)
  element.innerHTML = str
  return element
}

function $appendElement (element, str, target) {
  let new_element = $createElement(element)
  // inhoud van element
  let textnode = document.createTextNode(str)
  // element.innerHTML = str;
  new_element.appendChild(textnode)
  // voeg element toe aaan document in opgegeven doelelement
  document.querySelector(target).appendChild(new_element)
  return new_element
}

function $queryElement (element, query) {
  return element.querySelector(query)
}

function $strToElement (str) {
  let parser = new DOMParser()
  return parser.parseFromString(str, 'text/xml')
}

function $overviewTable (target, data, items, object, callback) {
  let overview_table = $('<table></table>').addClass('table table-striped table-hover')
  let overview_table_thead = $('<thead></thead>')
  let overview_table_thead_tr = $('<tr></tr>')

  for (let item_th of items) {
    overview_table_thead_tr.append('<th>' + object.PropertyLabel()[ '_' + item_th ] + '</th>')
  }
  overview_table_thead.html(overview_table_thead_tr)
  overview_table.append(overview_table_thead)
  let overview_table_tbody = $('<tbody></tbody>')
  for (let item of data) {
    let overview_table_tbody_tr = $('<tr></tr>').attr('id', item.id).attr('data-item', JSON.stringify(item))
    for (let item_td of items) {
      overview_table_tbody_tr.append(`<td class="td_${item}">${item[item_td]}</td>`)
    }

    overview_table_tbody.append(overview_table_tbody_tr)
  }
  overview_table.append(overview_table_tbody)
  $(target).html(overview_table)
  callback()
}

function $alert (type, icon, msg) {
  let info_alert_id = $getRandomInt(1000, 9999)
  let info_alert = $('<div></div>').addClass('alert alert-' + type).attr('role', 'alert').attr('id', info_alert_id)
  info_alert.html(`<i class="fas fa-${icon}"></i> ${msg}`)
  $('main').prepend(info_alert)
  setTimeout(() => {
    info_alert.fadeOut()
    setTimeout(() => { $('#' + info_alert_id).remove() }, 1000)
  }, 5000)
}
