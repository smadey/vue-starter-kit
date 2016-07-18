import { util } from 'vue';

export function once(el, eventName, handler) {
  if (typeof handler !== 'function') {
    return;
  }

  function onceHandler(evt) {
    util.off(el, eventName, onceHandler);
    handler(evt);
  }

  util.on(el, eventName, onceHandler);
}
