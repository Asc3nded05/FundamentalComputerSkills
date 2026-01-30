// Acts as a centralized hub for all event notifications
// Decouples individual components from the lessonRunner
export const eventBus = new EventTarget();

// Components call this function to emit desktop events which can be caught by the lessonRunner
export function dispatchDesktopEvent(name, detail = {}) {
  eventBus.dispatchEvent(new CustomEvent(name, { detail }));
}

// Save the original dispatchEvent
const originalDispatch = eventBus.dispatchEvent.bind(eventBus);

// Override dispatchEvent to also emit a wildcard event
// Allows lessonRunner to see every action the user takes, including incorrect ones
eventBus.dispatchEvent = function(event) {
  // Emit wildcard event that fires for any event triggered
  const wildcard = new CustomEvent("*", {
    detail: {
      type: event.type, // Ex. openFileExplorer
      detail: event.detail
    }
  });

  originalDispatch(wildcard);
  return originalDispatch(event);
};