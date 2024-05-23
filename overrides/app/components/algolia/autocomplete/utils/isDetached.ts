/**
 * Checks if the current environment is detached.
 *
 * This function determines if the current environment is detached by checking if the `window` object is defined and if the computed style of the document's root element matches the media query defined by the CSS variable `--aa-detached-media-query`.
 *
 * @returns {boolean} `true` if the environment is detached, `false` otherwise.
 */
export function isDetached() {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return window.matchMedia(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--aa-detached-media-query'
      )
    ).matches;
  }
}
