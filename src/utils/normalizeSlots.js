export function normalizeSlot(slots, key, context) {
  slots[key].forEach((vnode) => {
    if (!vnode.context) {
      slots[key].context = context;
    }
    if (!vnode.data) {
      vnode.data = {};
    }
    vnode.data.slot = key;
  });

  return slots[key]
}

const normalizeSlots = (slots, context) => Object.keys(slots)
  .reduce((arr, key) => {
    return arr.concat(normalizeSlot(slots, key, context));
  }, []);


export default normalizeSlots;
