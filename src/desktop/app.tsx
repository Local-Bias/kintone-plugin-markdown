import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import { Editor } from './components/editor';

import { pluginConditionState, markdownState } from './states/plugin';

type Props = Readonly<{ condition: kintone.plugin.Condition; initialMarkdown: string }>;

const Component: FC<Props> = ({ condition, initialMarkdown }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
      set(markdownState, initialMarkdown);
    }}
  >
    <Editor />
  </RecoilRoot>
);

export default Component;
