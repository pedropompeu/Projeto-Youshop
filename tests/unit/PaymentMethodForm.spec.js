import { shallowMount } from '@vue/test-utils'
import PaymentMethodForm from '@/components/PaymentMethodForm.vue'

describe('PaymentMethodForm.vue', () => {
  it('validates CPF correctly', () => {
    const wrapper = shallowMount(PaymentMethodForm)
    expect(wrapper.vm.validateCpf('123.456.789-09')).toBe(false)
    expect(wrapper.vm.validateCpf('000.000.000-00')).toBe(false)
    expect(wrapper.vm.validateCpf('111.444.777-35')).toBe(true)
  })
})
