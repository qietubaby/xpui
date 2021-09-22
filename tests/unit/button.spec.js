import chai, {expect} from 'chai'

import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import {mount} from '@vue/test-utils' // mount是完整的mount, shallowMount => 只mount一层，你的子组件是假的
import Button from '@/components/button/button.vue'

describe('Button.vue', () => {
    it('存在', () => {
        expect(Button).to.exist
    })

    it('点击 button 触发 click 事件', () => {
        const wrapper = mount(Button, {
            propsData: {
                icon: 'settings'
            }
        })
        const vm = wrapper.vm

        const callback = sinon.fake();
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.been.called
    })
  
})