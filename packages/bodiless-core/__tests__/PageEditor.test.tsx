import React from 'react';
import { observer } from 'mobx-react-lite';
import { mount } from 'enzyme';
import { useEditContext } from '../src/hooks';
import PageEditor from '../src/components/PageEditor';
import { Menu, menuRendered, itemRendered } from './helpers/Menu';
import PageEditContext from '../src/PageEditContext';
import { defaultStore } from '../src/PageEditContext/Store';

describe('PageEditor', () => {
  beforeEach(() => {
    defaultStore.reset();
    PageEditContext.root.unregisterPeers();
  });

  it('Toggles edit mode correctly', () => {
    const Inner = observer(() => {
      const { isEdit } = useEditContext();
      return <span id="inner">{isEdit ? 'edit' : 'preview'}</span>;
    });

    const wrapper = mount((
      <PageEditor>
        <Inner />
      </PageEditor>
    ));
    expect(wrapper.find('span#inner').text()).toBe('preview');
    wrapper.find('div[aria-label="Edit"]').simulate('click');
    expect(wrapper.find('span#inner').text()).toBe('edit');
  });

  it('updates its menu option status when toggling', () => {
    const wrapper = mount(<PageEditor />);
    expect(wrapper.find('div[aria-label="Edit"]').prop('isActive')).toBeFalsy();
    wrapper.find('div[aria-label="Edit"]').simulate('click');
    const button = wrapper.findWhere(
      n => (n.name() === 'ToolbarButton' && n.prop('aria-label') === 'Edit'),
    );
    expect(button.prop('isActive')).toBeTruthy();
  });

  it('Does not re-render a child context subscriber when edit mode toggles', () => {
    const innerSpy = jest.fn();
    const Inner = observer(() => {
      const { id } = useEditContext();
      innerSpy(id);
      return <></>;
    });
    const wrapper = mount((
      <PageEditor>
        <Inner />
      </PageEditor>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    wrapper.find('div[aria-label="Edit"]').simulate('click');
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('Does not re-render unnecessary menu items when edit mode changes', () => {
    menuRendered.mockClear();
    const Test = () => (
      <>
        <PageEditor />
        <Menu />
      </>
    );
    const wrapper = mount(<Test />);
    expect(menuRendered).toBeCalledTimes(2);
    expect(itemRendered).toBeCalledTimes(2);
    wrapper.find('div[aria-label="Edit"]').simulate('click');
    expect(menuRendered).toBeCalledTimes(2);
    expect(itemRendered).toBeCalledTimes(2);
    menuRendered.mockClear();
  });
});
