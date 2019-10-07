export const table = {
  methods: {
    select(id) {
      const index = this.selectElements.indexOf(id);

      if (index !== -1) {
        this.selectElements.splice(index, 1);
      } else {
        this.selectElements.push(id);
      }
    },
    isActive(id) {
      const index = this.selectElements.indexOf(id);

      if (index !== -1) {
        return 'isActive';
      } else {
        return '';
      }
    },
    checked(id) {
      const index = this.selectElements.indexOf(id);
      if (index !== -1) {
        return 'checked';
      } else {
        return '';
      }
    },
    eventSearch(event) {
      this.search = event.toLowerCase();
    },
    clearSearch() {
      this.search = '';
    }
  }
};
