<template>
  <ModalDialog id="buildRoadUpgradeLinkModal" :title="t('buildRoadUpgradeLink.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="tablink-build-road" data-bs-toggle="tab" data-bs-target="#tab-build-road" type="button" role="tab" aria-controls="tab-build-road" aria-selected="false">{{t('buildRoadUpgradeLink.buildRoad')}}</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="tablink-upgrade-link" data-bs-toggle="tab" data-bs-target="#tab-upgrade-link" type="button" role="tab" aria-controls="tab-upgrade-link" aria-selected="true">{{t('buildRoadUpgradeLink.upgradeLink')}}</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="tab-build-road" role="tabpanel" aria-labelledby="tablink-build-road" tabindex="0">
          <p>Autobot builds the next road section of the autobahn that matches the current color. If all available road sections have already been built, Autobot will instead <a href="#tablink-upgrade-link" data-bs-toggle="tab">upgrade a complete link</a>.</p>
          <p>Priority:</p>
          <ol>
            <li>The section of road that would allow one of Autobot’s Trucks to deliver a Goods token to or move towards its destination country. If tied, the country that appears highest on Autobot’s delivery board.</li>
            <li>A section of road that contains a Bonus token.</li>
            <li>The section of road nearest to the black autobahn (the fewest road sections to travel).</li>
            <li>In the first and second eras, the southernmost location, then the westernmost. In the third era, the northernmost location, then the easternmost.</li>
          </ol>
          <p>When building a road, Autobot places an Employee in the corresponding Office as usual. Autobot never pays building costs.</p>
        </div>
        <div class="tab-pane" id="tab-upgrade-link" role="tabpanel" aria-labelledby="tablink-upgrade-link" tabindex="0">
          <p>If all road sections are built, Autobot will instead upgrade a complete link.</p>
          <p>Priority:</p>
          <ol>
            <li>The section of road nearest to the black autobahn (the fewest roads spaces to travel).</li>
            <li>The closest to Bad Hersfeld.</li>
            <li>In the first and second eras, the southernmost location, then the westernmost. In the third era, the northernmost location, then the easternmost</li>
          </ol>
          <p>When upgrading a road, Autobot places an Employee in the corresponding Office as usual. Autobot never pays building costs.</p>
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
