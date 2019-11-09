<template>
  <div class="vendors">
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
            <th v-for="item in title" :key="item.vendor_id">{{item}}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.vendor_id)"
          :class="isActive(item.vendor_id)"
          v-for="item in filter"
          :key="item.vendor_id"
        >
          <td>{{item.vendor_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.status}}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.vendor_id)"
              @click.stop="select(item.vendor_id)"
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

import services from '@/services/services';
import { table } from "@/mixins/table";
import { cornerDialog } from "@/mixins/cornerDialog";

export default {
  name: "Vendors",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      vendors: []
    };
  },
  mounted() {
    const vendors = services.get('/api/vendor/get');
    vendors
      .then(vendor => {
        this.vendors = vendor.data;
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
      const foundItems = this.vendors.filter(item => {

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
      const { vendors, selectElements } = this;
      const selectVendors = this.getSelect(vendors, selectElements);
      if (event === "delete") {
        if (selectVendors.length > 0) {
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
        if (selectVendors.length > 0) {
          this.$router.push({
            name: event + " vendor",
            params: { selectVendors }
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
          name: event + " vendor",
          params: { selectVendors }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { vendors, selectElements } = this;
        const selectVendors = this.getSelect(vendors, selectElements).map((item) => item.vendor_id);
        const vendor = services.delete('/api/vendor/delete', selectVendors);
        vendor
          .then(() => {
            this.vendors = this.vendors.filter(
              item => !selectVendors.includes(item.vendor_id)
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
    getSelect(vendors, selectElements) {
      return vendors.filter(vendor =>
        selectElements.includes(vendor.vendor_id)
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