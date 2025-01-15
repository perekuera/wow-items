<template>
  <v-tooltip left min-width="400">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @mouseover="fetchTooltip">{{ itemId }}</v-btn>
    </template>
    <div class="tooltip" v-html="tooltipContent"></div>
  </v-tooltip>
  <!-- <v-hover>
    <template v-slot:default="{ isActive, props }">
      <div v-bind="props">
        <v-btn color="primary" @mouseover="fetchTooltip">Item</v-btn>
      </div>
    </template>

    <template v-slot:hover>
      <v-tooltip v-if="tooltipContent">
        <div v-html="tooltipContent"></div>
      </v-tooltip>
    </template>
  </v-hover> -->
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    itemId: {
      type: Number,
      required: true, // ID del ítem para consultar
    },
  },
  setup(props) {
    const tooltipContent = ref(null);
    const tooltipContentId = ref(null);

    const fetchTooltip = async () => {
      if (props.itemId === tooltipContentId.value) return; // Evita solicitudes repetidas

      try {
        const locale = 6; // Cambia según el idioma deseado
        const dataEnv = 8; // Configura según el entorno deseado
        const response = await fetch(
          `https://nether.wowhead.com/tooltip/item/${props.itemId}?dataEnv=${dataEnv}&locale=${locale}`
        );
        tooltipContentId.value = props.itemId;
        if (response.ok) {
          const data = await response.text(); // Wowhead devuelve HTML
          const json = JSON.parse(data);
          tooltipContent.value = json.tooltip;
          //await nextTick();
        } else {
          //console.error("Error al obtener el tooltip");
          tooltipContent.value = "<b>Item not found</b>";
          // tooltipContent.value = null;
          // tooltipContentId.value = null;
        }
      } catch (error) {
        console.error("Error al realizar la consulta:", error);
      }
    };

    return { tooltipContent, fetchTooltip };
  },
};
</script>

<style lang="scss">
.tooltip {
  background-color: black !important;
  border: 1px solid white !important;
  padding: 10px !important;
}
.v-tooltip > .v-overlay__content {
  padding: 0 !important;
}
</style>
