<template>
  <table>
    <tr>
      <th scope="row" colspan="2" v-html="t('scoring.points')"></th>
      <th v-html="t('scoring.bot')"></th>
      <th v-html="t('scoring.player')"></th>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.lobby')"></th>
      <td><AppIcon type="scoring" name="lobby" class="icon"/></td>
      <td><input type="number" min="0" max="99" step="2" @focus="inputSelectAll" v-model="pointsBot[0]"/></td>
      <td><input type="number" min="0" max="99" step="2" @focus="inputSelectAll" v-model="pointsPlayer[0]"/></td>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.networkDepartment')"></th>
      <td><AppIcon type="scoring" name="network-department" class="icon"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsBot[1]"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsPlayer[1]"/></td>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.tradeDepartment')"></th>
      <td><AppIcon type="scoring" name="trade-department" class="icon"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsBot[2]"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsPlayer[2]"/></td>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.serviceDepartment')"></th>
      <td><AppIcon type="scoring" name="service-department" class="icon"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsBot[3]"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsPlayer[3]"/></td>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.financeDepartment')"></th>
      <td><AppIcon type="scoring" name="finance-department" class="icon"/></td>
      <td></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsPlayer[4]"/></td>
    </tr>
    <tr>
      <th scope="row" v-html="t('scoring.planningCustomsDepartment')"></th>
      <td><AppIcon type="scoring" name="planning-department" class="icon"/><AppIcon type="scoring" name="customs-department" class="icon"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsBot[4]"/></td>
      <td><input type="number" min="0" max="99" step="1" @focus="inputSelectAll" v-model="pointsPlayer[5]"></td>
    </tr>
    <tr>
      <th scope="row" colspan="2" v-html="t('scoring.total')"></th>
      <td><b>{{totalPointsBot}}</b></td>
      <td><b>{{totalPointsPlayer}}</b></td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      pointsBot: [] as number[],
      pointsPlayer: [] as number[]
    }
  },
  computed: {
    totalPointsBot() : number {
      return this.pointsBot.reduce((a,b) => this.toNumber(a)+this.toNumber(b),0)
    },
    totalPointsPlayer() : number {
      return this.pointsPlayer.reduce((a,b) => this.toNumber(a)+this.toNumber(b),0)
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    toNumber(value? : number) {
      if (typeof value == 'string') {
        return 0
      }
      else {
        return value ?? 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
th, td {
  text-align: center;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
.icon {
  height: 20px;
  margin: 1px;
}
</style>
