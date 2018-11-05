import Container from './Container.js'
import { nodeOrNew } from './tools.js'
import { register } from './adopter.js'
import { registerMethods } from './methods.js'

export default class G extends Container {
  constructor (node) {
    super(nodeOrNew('g', node), G)
  }
}

registerMethods({
  Element: {
    // Create a group element
    group: function () {
      return this.put(new G())
    }
  }
})

register(G)
