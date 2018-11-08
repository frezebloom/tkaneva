class Minicart {
  //Открыть <---> Закрыть Панель корзины товаров
  open() {
    let opened = false;
    const minicart = document.querySelector(".minicart");
    const button = document.querySelector(".header-shopping-cart-button");
    button.addEventListener("click", () => {
      if (!opened) {
        minicart.style.marginRight = "0px";
        opened = true;
      } else {
        minicart.style.marginRight = "-350px";
        opened = false;
      }
    });
  }
}

export default Minicart;
