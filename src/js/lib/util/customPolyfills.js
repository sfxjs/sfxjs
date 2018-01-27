/**
 * NodeList.forEach()
 * NB! Requires Array.forEach
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
