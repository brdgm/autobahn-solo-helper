import AutobahnColor from '@/services/enum/AutobahnColor'
import getAutobahnColorCode from '@/util/getAutobahnColorCode'
import { expect } from 'chai'

describe('util/getAutobahnColorCode', () => {
  it('get', () => {
    for (const color of Object.values(AutobahnColor)) {
      expect(getAutobahnColorCode(color)).to.not.undefined
    }
  })
})
