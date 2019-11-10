// <template>
//   <div class="new-design">
//     <DesignForm 
//       title="Создать расцветку" 
//       :state="design"
//       :designs="designs"
//     />
//   </div>
// </template>
// <script>
// import DesignForm from "@/components/DesignForm";
// import services from "@/services/services";

// export default {
//   name: "NewDesign",
//   components: {
//     DesignForm
//   },
//   data() {
//     return {
//       design: {
//         name: "",
//         status: ""
//       },
//       designs: [] 
//     };
//   },
//   mounted() {
//     const designs = services.get('/api/design/get');
//     designs
//       .then(designs => {
//         this.designs = designs.data;
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }
// };
// </script>
