export default function addListener(on, event, handle) {
  if (on[event]) {
    if (Array.isArray(on[event])) {
      on[event].push(handle)
    } else {
      on[event] = [on[event], handle]
    }
  } else {
    on[event] = handle
  }
}
