<template>
  <div class="colors">
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
            <th v-for="item in title" :key="item.color_id">{{ item }}</th>
          </tr>
        </thead>
        <tr
          @click="select(item.color_id)"
          :class="isActive(item.color_id)"
          v-for="item in filter"
          :key="item.color_id"
        >
          <td>{{ item.color_id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>
            <input
              type="checkbox"
              :checked="checked(item.color_id)"
              @click.stop="select(item.color_id)"
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
  name: "Colors",
  mixins: [table, cornerDialog],
  components: {
    Topbar,
    Check,
    CornerDialog
  },
  data() {
    return {
      title: ["№", "Название", "Статус", ""],
      colors: []
    };
  },
  mounted() {
    token
      .checkToken()
      .then(token => {
        services
          .get("/api/color/get", token)
          .then(colors => {
            this.colors = colors.data;
          })
          .catch(error => {
            console.log(`Colors-1  ${error}`);
            this.showCornerDialog(
              "Ошибка",
              "Не удалось связаться с сервером. Обратитесь к администратору",
              "danger"
            );
          });
      })
      .catch(error => {
        console.log(`Colors-2  ${error}`);
        this.showCornerDialog(
          "Ошибка",
          "Не удалось связаться с сервером. Обратитесь к администратору",
          "danger"
        );
      });
  },
  computed: {
    filter() {
      const foundItems = this.colors.filter(item => {
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
      const { colors, selectElements } = this;
      const selectColors = this.getSelect(colors, selectElements);
      if (event === "delete") {
        if (selectColors.length > 0) {
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
        if (selectColors.length > 0) {
          this.$router.push({
            name: event + " color",
            params: { selectColors }
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
          name: event + " color",
          params: { selectColors }
        });
      }
    },
    check(event) {
      if (!event) {
        this.hideCheck = !this.hideCheck;
      } else {
        this.hideCheck = !this.hideCheck;
        const { colors, selectElements } = this;

        const selectColors = this.getSelect(colors, selectElements).map(
          item => item.color_id
        );

        this.deleteChange(selectColors);
      }
    },
    deleteChange(selectColors) {
      token
        .checkToken()
        .then(token => {
          services
            .delete("/api/color/delete", selectColors, token)
            .then(() => {
              this.colors = this.colors.filter(
                item => !selectColors.includes(item.color_id)
              );
              this.showCornerDialog(
                "Успех",
                "Операция удаления успешна завершена",
                "success"
              );
            })
            .catch(error => {
              console.log(`Colors-3  ${error}`);
              this.showCornerDialog(
                "Ошибка",
                "Не удалось связаться с сервером. Обратитесь к администратору",
                "danger"
              );
            });
        })
        .catch(error => {
          console.log(`Colors-4  ${error}`);
          this.showCornerDialog(
            "Ошибка",
            "Не удалось связаться с сервером. Обратитесь к администратору",
            "danger"
          );
        });
    },
    getSelect(colors, selectElements) {
      return colors.filter(color => selectElements.includes(color.color_id));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/table.scss";
@import "../../styles/cornerDialog.scss";
</style>
