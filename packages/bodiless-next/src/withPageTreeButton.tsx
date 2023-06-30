import React from 'react';
import { HOC } from '@bodiless/fclasses';
import { withPageTreeButton as withPageTreeButtonBase } from '@bodiless/page';
import { useNode } from '@bodiless/data';

const withPageTreeButton: HOC = Component => {
  const WithPageTreeButton = withPageTreeButtonBase(Component);
  return (props: any) => {
    const { node } = useNode();
    const { data } = node.peer('Site$_pages');
    return <WithPageTreeButton {...props} pages={data} />;
  };
};

export default withPageTreeButton;
