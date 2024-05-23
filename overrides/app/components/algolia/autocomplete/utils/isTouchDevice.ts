/**
 * Checks if the current device is a touch device.
 *
 * This function checks if the `window` object is defined and if it has an `ontouchstart` property,
 * which is a common indicator of a touch-enabled device.
 *
 * @returns {boolean} `true` if the device is a touch device, `false` otherwise.
 */
export function isTouchDevice() {
  if (window) {
    return 'ontouchstart' in window;
  } else {
    return false;
  }
}
