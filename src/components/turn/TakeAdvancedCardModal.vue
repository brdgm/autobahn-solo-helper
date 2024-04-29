<template>
  <ModalDialog id="takeAdvancedCardModal" :title="t('takeAdvancedCard.title')">
    <template #body>
      <p v-if="hasAdvancedCard" v-html="t('takeAdvancedCard.addCardInfo')"></p>
      <p v-else v-html="t('takeAdvancedCard.noCardLeft')"></p>
    </template>
    <template #footer>
      <template v-if="hasAdvancedCard">
        <button class="btn btn-primary" @click="addAdvancedCard" data-bs-dismiss="modal">{{t('takeAdvancedCard.title')}}</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
      </template>
      <template v-else>
        <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
      </template>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import TaskCardDeck from '@/services/TaskCardDeck'

export default defineComponent({
  name: 'TakeAdvancedCardModal',  
  components: {
    ModalDialog
  },
  emits: ['taskCardAdded'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    taskCardDeck: {
      type: TaskCardDeck,
      required: true
    },
  },
  computed: {
    hasAdvancedCard() : boolean {
      return this.taskCardDeck.advanced.length > 0
    }
  },
  methods: {
    addAdvancedCard() : void {
      this.taskCardDeck.addAdvancedCard()
      this.$emit('taskCardAdded')
    }
  }
})
</script>
