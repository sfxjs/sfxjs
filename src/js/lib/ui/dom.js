import is from './../util/is';

/**
 * Creates an element
 * @param  {string} tag                  the element's tag name, e.g. 'div'
 * @param  {string} className            the element's className, e.g. 'title'
 *                                       (optional)
 * @param  {string|HTMLDomElement} inner the element's innerHTML (optional)
 * @param  {Object} attrs                additional attributes (optional)
 * @return {HTMLDomElement}              a HTMLDomElement as specified if tag is
 *                                       a string, else a <div> HTMLDomElement
 */
export const cr = (tag, className, inner, attrs) => {
  if (typeof tag !== 'string') {
    tag = 'div';
  }
  const el = document.createElement(tag);

  if (className) {
    el.className = className;
  }

  if (inner !== undefined && inner !== null) {
    if (is.node(inner)) {
      ap(el,
        inner
      );
    } else if (!is.object(inner) && !is.function(inner)) {
      el.innerHTML = inner;
    }
  }

  if (attrs) {
    Object.assign(el, attrs);
  }

  return el;
};

const addChild = (parent, before, children) => {
  const add = (child) => {
    if (before) {
      parent.insertBefore(child, parent.firstChild);
    } else {
      parent.appendChild(child);
    }
  };
  if (parent) {
    children.forEach((child) => {
      if (is.defined(child)) {
        if (is.array(child)) {
          child.forEach((gChild) => {
            if (is.defined(gChild)) {
              if (is.string(gChild)) {
                add(cr('span', null, gChild));
              } else {
                add(gChild);
              }
            }
          });
        } else if (is.string(child)) {
          add(cr('span', null, child));
        } else {
          add(child);
        }
      }
    });
  }
  return parent;
};

/**
 * Prepend child elements to a parent element.
 * The first param is the parent, and any subsequent params are children
 * @param  {HTMLDomElement} parent the element to append to
 * @return {[type]}        [descr
 */
export const pp = (parent, ...children) =>
  addChild(parent, true, children);

/**
 * Append child elements to a parent element.
 * The first param is the parent, and any subsequent params are children
 * @param  {HTMLDomElement} parent the element to append to
 * @return {[type]}        [descr
 */
export const ap = (parent, ...children) =>
  addChild(parent, false, children);

/**
 * Removes an element from the DOM.
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
export const rm = (target) => {
  if (is.defined(target) && is.defined(target.parentNode)) {
    target.parentNode.removeChild(target);
  }
};

/**
 * Adds an event listnener
 * @param  {[type]}   target [description]
 * @param  {[type]}   type   [description]
 * @param  {Function} fn     [description]
 * @return {[type]}          [description]
 */
export const on = (target, type, fn) => {
  const fnWrap = (event) => {
    fn(event, target);
  };

  target.addEventListener(type, fnWrap);

  return target;
};

/**
 * Sets the entire classname
 * @param  {[type]} target    [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
export const sc = (target, className) => {
  target.className = className;
  return target;
};

/**
 * Adds the className if not already present
 * @param  {[type]} target    [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
export const ac = (target, className) => {
  if (!is.defined(target.className) || !is.inside(target.className, className)) {
    if (is.strNotEmpty(target.className)) {
      target.className += ' ' + className;
    } else {
      target.className = className;
    }
  }

  return target;
};

/**
 * Replaces the className
 * @param  {[type]} target        [description]
 * @param  {[type]} fromClassName [description]
 * @param  {[type]} toClassName   [description]
 * @return {[type]}               [description]
 */
export const rc = (target, fromClassName, toClassName) => {
  if (is.inside(target.className, fromClassName)) {
    target.className = target.className.replace(fromClassName, '').trim();
  }
  return ac(target, toClassName);
};

/**
 * Deletes the className
 * @param  {[type]} target    [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
export const dc = (target, className) =>
  target.className = target.className.replace(className, '').trim();


/**
 * Adds CSS styling
 * @param  {[type]} target [description]
 * @param  {[type]} styles [description]
 * @return {[type]}        [description]
 */
export const st = (target, styles) => {
  Object.assign(target.style, styles);
  return target;
};

/**
 * Triggered on document ready
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
export const ready = (fn) => {
  on(document, 'DOMContentLoaded', fn);
};

export const q = (search, root) => {
  if (is.defined(root)) {
    return root.querySelector(search);
  } else {
    return document.querySelector(search);
  }
};

export const qa = (search, root) => {
  if (is.defined(root)) {
    return root.querySelectorAll(search);
  } else {
    return document.querySelectorAll(search);
  }
};
