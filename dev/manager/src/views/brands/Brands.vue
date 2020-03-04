<template>
  <div class="brands">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar
      title="Производители"
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.brand_id">{{ item }}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.brand_id)"
          :class="isActive(item.brand_id)"
          v-for="item in filter"
          :key="item.brand_id"
        >
          <td>{{ item.brand_id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.brand_id)"
              @click.stop="select(item.brand_id)"
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
  name: "Brands",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      brands: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services.get("/api/brand/get", token).then(brand => {
          this.brands = brand.data;
        });
      })
      .catch(error => {
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  computed: {
    filter() {
      const foundItems = this.brands.filter(item => {
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
      const { brands, selectElements } = this;
      const selectBrands = this.getSelect(brands, selectElements);
      if (event === "delete") {
        if (selectBrands.length > 0) {
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
        if (selectBrands.length > 0) {
          this.$router.push({
            name: event + " brand",
            params: { selectBrands }
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
          name: event + " brand",
          params: { selectBrands }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { brands, selectElements } = this;
        const selectBrands = this.getSelect(brands, selectElements).map(
          item => item.brand_id
        );

        token
          .checkToken()
          .then(token => {
            services
              .delete("/api/brand/delete", selectBrands, token)
              .then(() => {
                this.brands = this.brands.filter(
                  item => !selectBrands.includes(item.brand_id)
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
              });
          })
          .catch(error => {
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
          });
      }
    },
    getSelect(brands, selectElements) {
      return brands.filter(brand => selectElements.includes(brand.brand_id));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>
