import React from 'react';
import { Button } from '@storybook/react/demo';

import mdx from './Example.mdx';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const Basic = () => <Button>Hello Button</Button>;

export const WithEmoji = () => (
  <Button>
    <span role="img" aria-label="yolo">
      😀 😎 👍 💯
    </span>
  </Button>
);
