<template>
  <ModalDialog id="botGainBonusModal" :title="t('botGainBonus.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="bonus-actions" data-bs-toggle="tab" data-bs-target="#bonus-tab-actions" type="button" role="tab" aria-controls="bonus-tab-actions" aria-selected="false">Autobot's bonus actions</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="bonus-board" data-bs-toggle="tab" data-bs-target="#bonus-tab-board" type="button" role="tab" aria-controls="bonus-tab-board" aria-selected="true">Solo Board Bonuses</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="bonus-promotions" data-bs-toggle="tab" data-bs-target="#bonus-tab-promotions" type="button" role="tab" aria-controls="bonus-tab-promotions" aria-selected="false">Autobot's promotions</button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane show active" id="bonus-tab-actions" role="tabpanel" aria-labelledby="bonus-actions" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><AppIcon type="bonus-action" name="discard"/></td>
                <td>
                  <span v-html="t('botGainBonus.discard')"></span><br/>
                  <ol>
                    <li v-html="t('botGainBonus.discardPrioItem1')"></li>
                    <li v-html="t('botGainBonus.discardPrioItem2')"></li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="develop-1-2"/></td>
                <td v-html="t('botGainBonus.develop')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="max1a"/><br/><AppIcon type="bonus-action" name="max1b"/></td>
                <td>
                  <span v-html="t('botGainBonus.advancedCard')"></span><br/>
                  <button class="btn btn-primary btn mt-1" data-bs-toggle="modal" data-bs-target="#takeAdvancedCardModal">
                    {{t('botGainBonus.takeAdvancedCard')}}
                  </button>
                </td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="promote"/></td>
                <td v-html="t('botGainBonus.promote')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="key"/></td>
                <td>
                  <span v-html="t('botGainBonus.colorCard')"></span><br/>
                  <button class="btn btn-primary btn mt-1" data-bs-toggle="modal" data-bs-target="#takeColorCardModal">
                    {{t('botGainBonus.takeColorCard')}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="tab-pane" id="bonus-tab-board" role="tabpanel" aria-labelledby="bonus-board" tabindex="0">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td><AppIcon type="bonus-action" name="develop-1-2"/></td>
                <td v-html="t('botGainBonus.develop')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="promote-service"/><br/><AppIcon type="bonus-action" name="promote-trade"/></td>
                <td v-html="t('botGainBonus.promoteServiceTrade')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="build-service-station"/></td>
                <td v-html="t('botGainBonus.buildServiceStation')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="build-road"/></td>
                <td v-html="t('botGainBonus.buildRoadSection')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="upgrade-link"/></td>
                <td v-html="t('botGainBonus.upgradeLink')"></td>
              </tr>
              <tr>
                <td><AppIcon type="bonus-action" name="place-employee"/></td>
                <td v-html="t('botGainBonus.placeEmployee')"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="tab-pane" id="bonus-tab-promotions" role="tabpanel" aria-labelledby="bonus-promotions" tabindex="0">
          <p v-html="t('botGainBonus.promotionInfo1')"></p>
          <p v-html="t('botGainBonus.promotionInfo2')"></p>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import AppIcon from '../structure/AppIcon.vue';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { Tab } from "bootstrap";

export default defineComponent({
  name: 'BotGainBonusModal',  
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  mounted() {
    this.enableTabLinksInContent()
  },
  methods: {
    enableTabLinksInContent() : void {
      const component = this.$el as HTMLElement
      component.querySelectorAll('a[data-bs-toggle="tab"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
          event.preventDefault();
          const target = anchor.getAttribute('href')
          if (target) {
            const modalElement = component.querySelector(target)
            if (modalElement) {
              const tab = new Tab(modalElement)
              tab.show()
            }
          }
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.tab-pane {
  background-color: #f8f8f8;
  border-left: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  padding: 10px;
}
.table {
  img {
    object-fit: contain;
    height: 60px;
    width: 60px;
  }
}
</style>
