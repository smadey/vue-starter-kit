function getChildren(component) {
  let children = [];
  let i;

  children = children.concat(component.$children);

  for (i = 0; i < component.$children.length; i++) {
    children = children.concat(getChildren(component.$children[i]));
  }

  return children;
}

export default {
  methods: {
    getAllChildren() {
      return getChildren(this);
    },
  },
};
