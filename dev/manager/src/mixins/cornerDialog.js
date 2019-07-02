export const cornerDialog = {
  data() {
    return {
      hideCornerDialog: true,
      cornerDialogStatus: "",
      cornerDialogMessage: "",
      cornerDialogBtnStyle: ""
    }
  },
  methods: {
    dialogFromUser(event) {
      this.hideCornerDialog = event;
    },
    showCornerDialog(status, message, style) {
      this.cornerDialogStatus = status;
      this.cornerDialogMessage = message;
      this.cornerDialogBtnStyle = style;
      setTimeout(() => {
        this.hideCornerDialog = false;
      }, 500);
      setTimeout(() => {
        this.hideCornerDialog = true;
      }, 10000);
    },
  }
}