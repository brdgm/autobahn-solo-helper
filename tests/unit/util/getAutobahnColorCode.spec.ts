import AutobahnColor from '@/services/enum/AutobahnColor'
import getAutobahnColorCode from '@/util/getAutobahnColorCode'
import { expect } from 'chai'

describe('util/getAutobahnColorCode', () => {
  it('get', () => {
    Object.values(AutobahnColor).forEach(color => {
      expect(getAutobahnColorCode(color)).to.not.undefined
    })
  })
})
