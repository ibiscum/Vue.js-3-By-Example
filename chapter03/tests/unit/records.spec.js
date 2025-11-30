import { shallowMount } from '@vue/test-utils'
import Records from '@/components/RecordsComp.vue'

describe('Records.vue', () => {
  it('gets records from local storage', () => {
    shallowMount(Records, {})
    expect(localStorage.getItem).toHaveBeenCalledWith('records');
  })
})
