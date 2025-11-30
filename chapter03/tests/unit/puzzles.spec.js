import { mount } from '@vue/test-utils'
import 'vitest-localstorage-mock';
import Puzzles from '@/components/PuzzlesComp.vue'

describe('PuzzlesComp.vue', () => {
  it('emit puzzled-changed event when Play button is clicked', () => {
    const wrapper = mount(Puzzles)
    wrapper.find('.play-button button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('puzzle-changed');
  })

  it('emit puzzled-changed event with the puzzle ID when Play button is clicked', () => {
    const wrapper = mount(Puzzles)
    wrapper.find('.play-button button').trigger('click');
    const puzzleChanged = wrapper.emitted('puzzle-changed');
    expect(puzzleChanged[0]).toEqual([wrapper.vm.puzzles[0].id]);
  })
})
