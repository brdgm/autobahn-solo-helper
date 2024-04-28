<template>
  <ModalDialog id="moveTruckModal" :title="t('moveTruck.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <p v-html="t('moveTruck.ignoreColor')"></p>
      <p v-html="t('moveTruck.passServiceStations')"></p>
      <p v-html="t('moveTruck.deliverGoods')"></p>
      <ul>
        <li v-html="t('moveTruck.deliverGoodsItem1')"></li>
        <li v-html="t('moveTruck.deliverGoodsItem2')"></li>
        <li v-html="t('moveTruck.deliverGoodsItem3')"></li>
        <li v-html="t('moveTruck.deliverGoodsItem4')"></li>
      </ul>
      <p v-html="t('moveTruck.era3Countries')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'MoveTruckModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
