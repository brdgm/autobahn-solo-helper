<template>
  <ModalDialog id="buildRoadUpgradeLinkModal" :title="t('buildRoadUpgradeLink.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="tablink-build-road" data-bs-toggle="tab" data-bs-target="#tab-build-road" type="button" role="tab" aria-controls="tab-build-road" aria-selected="false">{{t('buildRoadUpgradeLink.buildRoad.title')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-upgrade-link" data-bs-toggle="tab" data-bs-target="#tab-upgrade-link" type="button" role="tab" aria-controls="tab-upgrade-link" aria-selected="true">{{t('buildRoadUpgradeLink.upgradeLink.title')}}</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="tab-build-road" role="tabpanel" aria-labelledby="tablink-build-road" tabindex="0">
          <p v-html="t('buildRoadUpgradeLink.buildRoad.intro')"></p>
          <h6 v-html="t('buildRoadUpgradeLink.buildRoad.priority.title')"></h6>
          <ol>
            <li v-html="t('buildRoadUpgradeLink.buildRoad.priority.item1')"></li>
            <li v-html="t('buildRoadUpgradeLink.buildRoad.priority.item2')"></li>
            <li v-html="t('buildRoadUpgradeLink.buildRoad.priority.item3')"></li>
            <li v-html="t('buildRoadUpgradeLink.buildRoad.priority.item4')"></li>
          </ol>
          <p v-html="t('buildRoadUpgradeLink.buildRoad.employeeCostInfo')"></p>
        </div>
        <div class="tab-pane" id="tab-upgrade-link" role="tabpanel" aria-labelledby="tablink-upgrade-link" tabindex="0">
          <p v-html="t('buildRoadUpgradeLink.upgradeLink.intro')"></p>
          <h6 v-html="t('buildRoadUpgradeLink.upgradeLink.priority.title')"></h6>
          <ol>
            <li v-html="t('buildRoadUpgradeLink.upgradeLink.priority.item1')"></li>
            <li v-html="t('buildRoadUpgradeLink.upgradeLink.priority.item2')"></li>
            <li v-html="t('buildRoadUpgradeLink.upgradeLink.priority.item3')"></li>
          </ol>
          <p v-html="t('buildRoadUpgradeLink.upgradeLink.employeeCostInfo')"></p>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import enableTabLinksInContent from '@/util/enableTabLinksInContent';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BuildRoadUpgradeLinkModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  mounted() {
    enableTabLinksInContent(this.$el as HTMLElement)
  },
})
</script>
