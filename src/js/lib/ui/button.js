import { cr, on } from './dom';

/**
 * Creates an HTML <button> element
 * @param  {function} onClick                 the function to call when clicking
 *                                            the <button>
 * @param  {string} className                 the className of the <button>
 *                                            (optional)
 * @param  {string|HTMLDomElement} innerHTML  the innerHTML contents of the
 *                                            <button> (optional)
 * @param  {Object} attrs                     additional attributes (optional)
 * @return {HTMLDomElement}                   an HTML <button>
 */
const button = (onClick, className, innerHTML, attrs) => {
  className = 'btn' + (className ? ' ' + className : '');

  const buttonElement = cr('button', className, innerHTML, attrs);

  on(buttonElement, 'click', onClick);

  return buttonElement;
};

export default button;
