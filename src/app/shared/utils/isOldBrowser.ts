declare var bowser: any;

export function isOldBrowser() {
  return isOldIE() || isOldSafari();
}
function isOldIE() {
  return bowser.msie;
}
function isOldSafari() {
  return bowser.safari && getMainVersion(bowser.version) < 10;
}
function getMainVersion(version) {
  return +(version + '').split('.')[0];
}
