import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';

describe('Prueba en el FAB component', () => {
    test('debe de mostrar el icono por defecto', () => {
        const wrapper = shallowMount(Fab);
        const icon = wrapper.find('i');
        expect(icon.classes('fa-plus')).toBeTruthy();
    })
    test('debe de mostrar el por argumento: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            propsData: {
                icon: 'fa-circle'
            }
        });
        const icon = wrapper.find('i');
        expect(icon.classes('fa-circle')).toBeTruthy();
    })
    test('debe de emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount(Fab);
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted().click).toBeTruthy();
    })
})