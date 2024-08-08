function trackEvent(event) {
    if (window && window.analytics) {
        window.analytics.track(event)
    }
}
export {trackEvent}
