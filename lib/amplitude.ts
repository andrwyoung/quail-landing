import * as amplitude from "@amplitude/analytics-browser";

let isInitialized = false;

export function initAmplitude() {
  if (isInitialized) return;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  if (!apiKey) {
    console.warn("Amplitude API key not found");
    return;
  }

  try {
    amplitude.init(apiKey);

    isInitialized = true;
    console.log("Amplitude initialized");
  } catch (error) {
    console.error("Failed to initialize Amplitude:", error);
  }
}

export function trackEvent(
  eventName: string,
  eventProperties?: Record<string, unknown>
) {
  if (!isInitialized) {
    console.warn(
      `Cannot track event "${eventName}": Amplitude not initialized`
    );
    return;
  }

  try {
    amplitude.track(eventName, eventProperties);
  } catch (error) {
    console.error(`Error tracking event "${eventName}":`, error);
  }
}

export function identifyUser(
  userId: string,
  userProperties?: Record<string, string | number | boolean>
) {
  amplitude.setUserId(userId);
  if (userProperties) {
    const identify = new amplitude.Identify();
    Object.entries(userProperties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  }
}

export { amplitude };
