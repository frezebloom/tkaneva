import userService from "@/services/userService";

export const table = {
    methods: {
    route(event) {
      const { users, selectElements } = this;
      const selectUsers = this.getSelectUsers(users, selectElements);
      if (event !== "delete") {
        this.$router.push({
          name: event + " user group",
          params: { selectUsers }
        });
      } else {
        this.hideCheck = !this.hideCheck;
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { users, selectElements } = this;
        const selectUsers = this.getSelectUsers(users, selectElements);
        selectUsers.forEach(item => {
          const user = userService.deleteUser(item);
          user
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    },
    getSelectUsers(users, selectElements) {
      const selectUsers = users.filter(user => {
        if (selectElements.includes(user.user_id)) {
          return user;
        }
      });

      return selectUsers;
    },
    select(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        this.selectElements.splice(index, 1);
      } else {
        this.selectElements.push(user_id);
      }
    },
    isActive(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        return "isActive";
      } else {
        return "";
      }
    },
    checked(user_id) {
      const index = this.selectElements.indexOf(user_id);

      if (index !== -1) {
        return "checked";
      } else {
        return "";
      }
    }
  }
}