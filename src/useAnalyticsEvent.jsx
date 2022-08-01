//useAnalyticsEventTracker.jsx

import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="unregistered category") => {
  const eventTracker = (action = "unregistered action", label = "unregistered event") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;