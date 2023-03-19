<template>
  <ModalDialog id="takeAdvancedCardModal" :title="t('takeAdvancedCard.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <p>...</p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'TakeAdvancedCardModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>