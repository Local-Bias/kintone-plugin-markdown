import React, { FCX } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { markdownState } from '../states/plugin';

const Component: FCX = ({ className }) => {
  const [markdown, setMarkdown] = useRecoilState(markdownState);

  const onMarkdownChange = (editor: any, data: any, value: any) => {
    console.log({ editor, data, value });
    setMarkdown(value);
  };

  return (
    <div className={className}>
      <MarkdownEditor value={markdown} onChange={onMarkdownChange} />
    </div>
  );
};

const StyledComponent = styled(Component)`
  height: 24rem;
  display: flex;

  * {
    background-color: #fff !important;
  }

  > div {
    flex-grow: 1;
  }

  .CodeMirror,
  .md-editor-content-editor {
    height: 100%;
  }

  .md-editor-content {
    height: calc(100% - 2rem);
  }
`;

export const Editor = StyledComponent;
