import { proxyProperty, initProxyProperties } from './utils'

/**
 * Represents a rectangle.
 */
export class Rectangle {
  /**
   * Return a new Rectangle object for a given x,y, width and height.
   *
   * @param {number | Rectangle} x The x coordinate of the top-left corner of the rectangle. Or a Rectangle.
   * @param {number} y The y coordinate of the top-left corner of the rectangle.
   * @param {number} width The width of the rectangle.
   * @param {number} height The height of the rectangle.
   * @return The new Rectangle object.
   */
  constructor(x, y, width, height) {
    initProxyProperties(this)

    proxyProperty(this, 'x', parseFloat(x))
    proxyProperty(this, 'y', parseFloat(y))
    proxyProperty(this, 'width', parseFloat(width))
    proxyProperty(this, 'height', parseFloat(height))

    // if the argument is object
    if (typeof x === 'object' && typeof x.x === 'number') {
      this._x = parseFloat(x.x)
      this._y = parseFloat(x.y)
      this._width = parseFloat(x.width)
      this._height = parseFloat(x.height)
    }
  }

  /**
   * Adjust this rectangle by offsetting it.
   *
   * @param {number} x The x offset to apply.
   * @param {number} y The y offset to apply.
   */
  offset(x, y) {
    this._x += parseFloat(x)
    this._y += parseFloat(y)
    if (this._parent && this._parentKey) {
      this._parent[this._parentKey] = this
    }
    return this
  }

  scale(factorWidth, factorHeight) {
    this._width *= parseFloat(factorWidth)
    this._height *= parseFloat(
      typeof factorHeight === 'undefined' ? factorWidth : factorHeight
    )
    if (this._parent && this._parentKey) {
      this._parent[this._parentKey] = this
    }
    return this
  }

  /**
   * Return the Rectangle as a CGRect.
   *
   * @return {CGRect} The rectangle.
   */
  asCGRect() {
    return CGRectMake(this._x, this._y, this._width, this._height)
  }

  /**
   * Return a string description of the rectangle.
   *
   * @return {string} Description of the rectangle.
   */
  toString() {
    return `{${this._x}, ${this._y}, ${this._width}, ${this._height}}`
  }

  toJSON() {
    return {
      x: this._x,
      y: this._y,
      width: this._width,
      height: this._height,
    }
  }
}
