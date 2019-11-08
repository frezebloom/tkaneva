<template>
  <div class="designs">
    <Check
      :hideCheck="hideCheck"
      :header="checkHeader"
      :question="checkQuestion"
      @eventClickCheck="check($event)"
    />
    <Topbar 
      title="Расцветки" 
      @eventClickTopBar="route($event)"
      @eventHandlerSearch="eventSearch($event)"
      @eventClearSearch="clearSearch()"
    />
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="item in title" :key="item.id">{{item}}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.design_id)"
          :class="isActive(item.design_id)"
          v-for="item in filter"
          :key="item.design_id"
        >
          <td>{{item.design_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.status}}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.design_id)"
              @click.stop="select(item.design_id)"
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
  name: "Designs",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      designs: []
    };
  },
  mounted() {
    const designs = services.get('/api/design/get');
    designs
      .then(design => {
        this.design = design.data;
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
      const foundItems = this.designs.filter(item => {

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
      const { designs, selectElements } = this;
      const selectDesigns = this.getSelect(designs, selectElements);
      if (event === "delete") {
        if (selectDesigns.length > 0) {
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
        if (selectDesigns.length > 0) {
          this.$router.push({
            name: event + " design",
            params: { selectDesigns }
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
          name: event + " design",
          params: { selectDesigns }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { designs, selectElements } = this;
        const selectDesigns = this.getSelect(designs, selectElements).map((item) => item.design_id);
        const designs = services.delete('/api/design/delete', selectDesigns);
        design
          .then(() => {
            this.designs = this.designs.filter(
              item => !selectDesigns.includes(item.design_id)
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
    getSelect(designs, selectElements) {
      return designs.filter(design =>
        selectElements.includes(design.design_id)
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