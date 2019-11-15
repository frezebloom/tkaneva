<template>
  <div class="product-groups">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar 
      title="Категории" 
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.group_id">{{item}}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.group_id)"
          :class="isActive(item.group_id)"
          v-for="item in filter"
          :key="item.group_id"
        >
          <td>{{item.group_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.status}}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.group_id)"
              @click.stop="select(item.group_id)"
            >
          </td>
        </tr>
      </table>
    </div>

    <div v-bind:class="[hideCornerDialog ? 'notActive-corner-dialog' : 'isActive-corner-dialog']">
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
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";

export default {
  name: "ProductGroups",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      productGroups: []
    };
  },
  mounted() {
    const productGroups = services.get('/api/product-group/get');
    productGroups
      .then(productGroups => {
        this.productGroups = productGroups.data;
      })
      .catch(error => {
        console.log(error);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  computed: {
    filter() {
      const foundItems = this.productGroups.filter(item => {

        let found = false;

        Object.keys(item).forEach(obj => {
          const string = String(item[obj]);
          const dataString = string.toLowerCase();
          if (dataString.includes(this.search)) found = true;
        });

        if (found) return item;

      });

      return foundItems;

    },
  },
  methods: {
    route(event) {
      const { productGroups, selectElements } = this;
      const selectProductGroups = this.getSelect(productGroups, selectElements);
      if (event === "delete") {
        if (selectProductGroups.length > 0) {
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
        if (selectProductGroups.length > 0) {
          this.$router.push({
            name: event + " product group",
            params: { selectProductGroups }
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
          name: event + " product group",
          params: { selectProductGroups }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { productGroups, selectElements } = this;
        const selectProductGroups = this.getSelect(productGroups, selectElements).map((item) => item.group_id);
        const productGroup = services.delete('/api/product-group/delete', selectProductGroups);
        productGroup
          .then(() => {
            this.productGroups = this.productGroups.filter(
              item => !selectProductGroups.includes(item.group_id)
            );
            this.showCornerDialog(
              "Успех",
              "Операция удаления успешна завершена",
              "success"
            );
          })
          .catch(error => {
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
            console.error(error);
          });
      }
    },
    getSelect(productGroups, selectElements) {
      return productGroups.filter(productGroup =>
        selectElements.includes(productGroup.group_id)
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