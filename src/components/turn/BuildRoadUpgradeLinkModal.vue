<template>
  <ModalDialog id="buildRoadUpgradeLinkModal" :title="t('buildRoadUpgradeLink.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" id="tablink-build-road" data-bs-toggle="tab" data-bs-target="#tab-build-road" type="button" role="tab" aria-controls="tab-build-road" aria-selected="false">{{t('buildRoadUpgradeLink.buildRoad.title')}}</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="tablink-upgrade-link" data-bs-toggle="tab" data-bs-target="#tab-upgrade-link" type="button" role="tab" aria-controls="tab-upgrade-link" aria-selected="true">{{t('buildRoadUpgradeLink.upgradeLink.title')}}</button>
        </li>
      </ul>
      <div class="tab-content">
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
          <p>
            <AppIcon type="bonus-action" name="develop-1" class="icon"/>
            <span v-html="t('buildRoadUpgradeLink.buildRoad.developIcon')"></span>
          </p>
          <p>
            <AppIcon name="bonus-tile" class="icon"/>
            <span v-html="t('buildRoadUpgradeLink.buildRoad.bonusTile')"></span>
          </p>
        </div>
        <div class="tab-pane" id="tab-upgrade-link" role="tabpanel" aria-labelledby="tablink-upgrade-link" tabindex="0">
          <p v-html="t('buildRoadUpgradeLink.upgradeLink.intro')"></p>
          <h6 v-html="t('buildRoadUpgradeLink.upgradeLink.priority.title')"></h6>
          <ol>
            <li v-if="hasTrafficExpansion" v-html="t('buildRoadUpgradeLink.upgradeLink.priority.itemTraffic')"></li>
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
import { useI18n } from 'vue-i18n'
import enableTabLinksInContent from 'brdgm-commons/src/util/tab/enableTabLinksInContent'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import Expansion from '@/services/enum/Expansion'
import { useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BuildRoadUpgradeLinkModal',  
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasTrafficExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.TRAFFIC)
    },
  },
  mounted() {
    enableTabLinksInContent(this.$el as HTMLElement)
  },
})
</script>

<style lang="scss" scoped>
.icon {
  height: 40px;
  float: left;
  margin-right: 10px;
  margin-bottom: 5px;
}
p {
  clear: both;
}
</style>
