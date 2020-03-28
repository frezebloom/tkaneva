<template>
  <div class="products">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar
      title="Товары"
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.product_id">{{ item }}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.product_id)"
          :class="isActive(item.product_id)"
          v-for="item in filter"
          :key="item.product_id"
        >
          <td>{{ item.product_id }}</td>
          <td>{{ item.article }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category.name }}</td>
          <td>{{ item.brand.name }}</td>
          <td>{{ item.balance }} шт.</td>
          <td>{{ item.price }} ₽</td>
          <td>{{ item.discount }} %</td>
          <td>{{ item.status }}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.product_id)"
              @click.stop="select(item.product_id)"
            />
          </td>
        </tr>
      </table>
    </div>

    <div
      v-bind:class="[
        hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog'
      ]"
    >
      <CornerDialog
        @eventClickCornerDialog="dialogFromUser"
        :status="cornerDialogStatus"
        :message="cornerDialogMessage"
        :buttonStyle="cornerDialogBtnStyle"
      />
    </div>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar.vue";
import Check from "@/components/Check.vue";
import CornerDialog from "@/components/CornerDialog";

import services from "@/services/services";
import token from "@/utils/token";
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";

export default {
  name: "Products",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: [
        "№",
        "Код товара",
        "Название",
        "Категория",
        "Производитель",
        "Остаток",
        "Цена",
        "Скидка",
        "Статус",
        ""
      ],
      products: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services
          .get("/api/product/get", token)
          .then(products => {
            this.products = products.data;
          })
          .catch(error => {
            console.log(`Products-1  ${error}`);
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
          });
      })
      .catch(error => {
        console.log(`Products-2  ${error}`);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  computed: {
    filter() {
      const foundItems = this.products.filter(item => {
        let found = false;

        Object.keys(item).forEach(obj => {
          const string = String(item[obj]);
          const dataString = string.toLowerCase();
          if (dataString.includes(this.search)) found = true;
        });

        if (found) return item;
      });

      return foundItems;
    }
  },
  methods: {
    route(event) {
      const { products, selectElements } = this;
      const selectProducts = this.getSelect(products, selectElements);
      console.log(selectProducts);
      if (event === "delete") {
        if (selectProducts.length > 0) {
          this.hideCheck = !this.hideCheck;
        } else {
          this.showCornerDialog(
            "Ошибка",
            "Выберите хотя бы один элемент для удаления",
            "warning"
          );
        }
      }
      if (event === "edit") {
        if (selectProducts.length > 0) {
          this.$router.push({
            name: event + " product",
            params: { selectProducts }
          });
        } else {
          this.showCornerDialog(
            "Ошибка",
            "Выберите хотя бы один элемент для редактирования",
            "warning"
          );
        }
      }
      if (event === "new") {
        this.$router.push({
          name: event + " product",
          params: { selectProducts }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { products, selectElements } = this;

        const selectProducts = this.getSelect(products, selectElements).map(
          item => item.product_id
        );

        this.deleteChange(selectProducts);
      }
    },
    deleteChange(selectProducts) {
      token
        .checkToken()
        .then(token => {
          services
            .delete("/api/product/delete", selectProducts, token)
            .then(() => {
              this.products = this.products.filter(
                item => !selectProducts.includes(item.product_id)
              );
              this.showCornerDialog(
                "Успех",
                "Операция удаления успешна завершена",
                "success"
              );
            })
            .catch(error => {
              console.log(`Products-3  ${error}`);
              this.showCornerDialog(
                "Ошибка",
                "Не удалось связаться с сервером. Обратитесь к администратору",
                "danger"
              );
            });
        })
        .catch(error => {
          console.log(`Products-4  ${error}`);
          this.showCornerDialog(
            "Ошибка",
            "Не удалось связаться с сервером. Обратитесь к администратору",
            "danger"
          );
        });
    },
    getSelect(products, selectElements) {
      return products.filter(product =>
        selectElements.includes(product.product_id)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>
