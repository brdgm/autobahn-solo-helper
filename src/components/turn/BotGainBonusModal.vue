<template>
  <ModalDialog id="botGainBonusModal" :title="t('botGainBonus.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" id="tablink-bonus-actions" data-bs-toggle="tab" data-bs-target="#tab-bonus-actions" type="button" role="tab" aria-controls="tab-bonus-actions" aria-selected="false">{{t('botGainBonus.bonusActions')}}</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="tablink-bonus-board" data-bs-toggle="tab" data-bs-target="#tab-bonus-board" type="button" role="tab" aria-controls="tab-bonus-board" aria-selected="true">{{t('botGainBonus.boardBonuses')}}</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="tablink-bonus-promotions" data-bs-toggle="tab" data-bs-target="#tab-bonus-promotions" type="button" role="tab" aria-controls="tab-bonus-promotions" aria-selected="false">{{t('botGainBonus.autobotPromotions')}}</button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane show active" id="tab-bonus-actions" role="tabpanel" aria-labelledby="tablink-bonus-actions" tabindex="0">
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
        <div class="tab-pane" id="tab-bonus-board" role="tabpanel" aria-labelledby="tablink-bonus-board" tabindex="0">
          <p class="small" v-html="t('botGainBonus.soloBoardInfoBonusTokens')"></p>
          <p class="small" v-html="t('botGainBonus.soloBoardInfoServiceStations')"></p>
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
        <div class="tab-pane" id="tab-bonus-promotions" role="tabpanel" aria-labelledby="tablink-bonus-promotions" tabindex="0">
          <p v-html="t('botGainBonus.promotionInfo1')"></p>
          <p v-html="t('botGainBonus.promotionInfo2')"></p>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import enableTabLinksInContent from 'brdgm-commons/src/util/tab/enableTabLinksInContent'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

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
    enableTabLinksInContent(this.$el as HTMLElement)
  },
})
</script>

<style lang="scss" scoped>
.table {
  img {
    object-fit: contain;
    height: 60px;
    width: 60px;
  }
}
</style>
