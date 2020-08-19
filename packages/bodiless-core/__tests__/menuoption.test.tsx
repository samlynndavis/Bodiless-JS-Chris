import React, {
  FC, useMemo,
} from 'react';
// import { observable, action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { mount } from 'enzyme';
import { flowRight } from 'lodash';
import { withMenuOptions } from '../src/PageContextProvider';
import { useEditContext } from '../src/hooks';
import { withContextActivator } from '../src/hoc';
import PageEditContext from '../src/PageEditContext';

describe('useMemo for getMenuOptions', () => {
  let mockIsEdit: any;

  beforeAll(() => {
    mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
  });

  afterAll(() => {
    mockIsEdit.mockRestore();
  });

  it('Children do not re-render on parent prop change', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      return <span>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('Children do not re-render on parent prop change when parent provides options', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      return <span>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer$: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };
    const withOuterOptions = withMenuOptions({
      id: 'Outer',
      useMenuOptions: () => useMemo(() => [{ name: 'outer' }], []),
    });
    const Outer = withOuterOptions(Outer$);

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('Subscribers to edit context do not re-render when peer context is added', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      const { isEdit } = useEditContext();
      const className = isEdit ? 'foo' : undefined;
      return <span className={className}>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer$: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };
    const withOuterOptions = withMenuOptions({
      id: 'Outer',
      useMenuOptions: () => [{ name: 'outer' }],
      peer: true,
    });
    const Outer = withOuterOptions(Outer$);

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
    PageEditContext.root.unregisterPeers();
  });

  it('Subscribers to edit content do not re-render when parent with memoized options re-renders', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      const { isEdit } = useEditContext();
      const className = isEdit ? 'foo' : undefined;
      return <span className={className}>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer$: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };
    const withOuterOptions = withMenuOptions({
      id: 'Outer',
      useMenuOptions: () => useMemo(() => [{ name: 'outer' }], []),
    });
    const Outer = withOuterOptions(Outer$);

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('Subscribers to edit content do not re-render when parent changes  options', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      const { isEdit } = useEditContext();
      const className = isEdit ? 'foo' : undefined;
      return <span className={className}>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer$: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };
    const withOuterOptions = withMenuOptions({
      id: 'Outer',
      useMenuOptions: ({ foo }: any) => [{ name: foo }],
    });
    const Outer = withOuterOptions(Outer$);

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('Subscribers to edit content do not re-render when parent changes options', () => {
    const innerSpy = jest.fn();
    const Inner: FC<any> = ({ children }) => {
      innerSpy();
      const { isEdit } = useEditContext();
      const className = isEdit ? 'foo' : undefined;
      return <span className={className}>{children}</span>;
    };
    const outerSpy = jest.fn();
    const Outer$: FC<any> = ({ children }) => {
      outerSpy();
      return <span>{children}</span>;
    };
    const withOuterOptions = withMenuOptions({
      id: 'Outer',
      useMenuOptions: ({ foo }: any) => [{ name: foo }],
    });
    const Outer = withOuterOptions(Outer$);

    const wrapper = mount((
      <Outer>
        <Inner />
      </Outer>
    ));
    expect(innerSpy).toBeCalledTimes(1);
    expect(outerSpy).toBeCalledTimes(1);
    wrapper.setProps({ foo: 'bar' });
    expect(outerSpy).toBeCalledTimes(2);
    expect(innerSpy).toBeCalledTimes(1);
  });

  it('correctly updates menu options with a memoized getter using a ref', () => {
    const Menu = observer(() => {
      const { contextMenuOptions } = useEditContext();
      const items = contextMenuOptions.map(option => (
        <span key={option.name}>{option.name}</span>
      ));
      return <>{items}</>;
    });
    const useMenuOptions = ({ foo }: any) => [{ name: foo }];
    const Span: FC<any> = props => <span {...props} />;
    const Provider = flowRight(
      withMenuOptions({
        id: 'Provider',
        useMenuOptions,
      }),
      withContextActivator('onClick'),
    )(Span);

    const Test = (props: any) => (
      <>
        <Provider {...props} />
        <Menu />
      </>
    );
    const wrapper = mount(<Test foo="bar" id="activate" />);
    wrapper.find('span#activate').simulate('click');
    expect(wrapper.text()).toBe('bar');
    wrapper.setProps({ foo: 'baz' });
    wrapper.update();
    expect(wrapper.text()).toBe('baz');
  });

  it('correctly updates menu options when provided as an array to withMenuOptions', () => {
    const Menu = observer(() => {
      const { contextMenuOptions } = useEditContext();
      const items = contextMenuOptions.map(option => (
        <span key={option.name}>{option.name}</span>
      ));
      return <>{items}</>;
    });

    const useMenuOptions = ({ foo }: any) => [{ name: foo }];

    const Span: FC<any> = props => <span {...props} />;
    const Provider = flowRight(
      withMenuOptions({
        id: 'Provider',
        useMenuOptions,
      }),
      withContextActivator('onClick'),
    )(Span);

    const Test = (props: any) => (
      <>
        <Provider {...props} />
        <Menu />
      </>
    );
    const wrapper = mount(<Test foo="bar" id="activate" />);
    wrapper.find('span#activate').simulate('click');
    expect(wrapper.text()).toBe('bar');
    wrapper.setProps({ foo: 'baz' });
    wrapper.update();
    expect(wrapper.text()).toBe('baz');
  });
});
