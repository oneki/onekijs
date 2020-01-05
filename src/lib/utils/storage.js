export function onStorageChange(key, listener) {
  const wrapper = event => {
    if (!event) {
      event = window.event;
    } // ie
    if (event.key === key) {
      listener(event.newValue, event.oldValue);
    }
  };
  if (window.addEventListener) {
    window.addEventListener("storage", wrapper, false);
  } else {
    window.attachEvent("onstorage", wrapper);
  }
}
