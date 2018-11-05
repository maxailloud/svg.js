import { camelCase } from './helpers.js'
import { isBlank } from './regex.js'
import { registerMethods } from './methods.js'

// FIXME: We dont need exports

// Dynamic style generator
export function css (style, val) {
  let ret = {}
  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/)
      .filter(function (el) { return !!el.length })
      .forEach(function (el) {
        let t = el.split(/\s*:\s*/)
        ret[t[0]] = t[1]
      })
    return ret
  }

  if (arguments.length < 2) {
    // get style properties in the array
    if (Array.isArray(style)) {
      for (let name of style) {
        let cased = camelCase(name)
        ret[cased] = this.node.style[cased]
      }
      return ret
    }

    // get style for property
    if (typeof style === 'string') {
      return this.node.style[camelCase(style)]
    }

    // set styles in object
    if (typeof style === 'object') {
      for (let name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[camelCase(name)] =
          (style[name] == null || isBlank.test(style[name])) ? '' : style[name]
      }
    }
  }

  // set style for property
  if (arguments.length === 2) {
    this.node.style[camelCase(style)] =
      (val == null || isBlank.test(val)) ? '' : val
  }

  return this
}

// Show element
export function show () {
  return this.css('display', '')
}

// Hide element
export function hide () {
  return this.css('display', 'none')
}

// Is element visible?
export function visible () {
  return this.css('display') !== 'none'
}

registerMethods('Dom', {
  css, show, hide, visible
})
