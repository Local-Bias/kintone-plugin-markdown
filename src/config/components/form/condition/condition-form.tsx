import React, { ChangeEventHandler, FC, FCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';

import { storageState } from '../../../states';
import { MenuItem, TextField } from '@mui/material';
import { richTextFieldsState } from '../../../states/kintone';
import { kx } from '../../../../types/kintone-field';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: kx.Field[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Component: FCX<Props> = ({ className, condition, appFields, onChange }) => (
  <div {...{ className }}>
    <div>
      <h3>対象フィールド (リッチエディタ)</h3>
      <TextField
        select
        value={condition.field}
        label='フィールド名'
        {...{ onChange }}
        className='input'
      >
        {appFields.map(({ code, label }, i) => (
          <MenuItem key={i} value={code}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    border-left: 2px solid #0002;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }

  .input {
    min-width: 250px;
  }
`;

const Container: FC<ContainerProps> = ({ condition, index }) => {
  const appFields = useRecoilValue(richTextFieldsState);
  const setStorage = useSetRecoilState(storageState);

  const setConditionProps = <T extends keyof kintone.plugin.Condition>(
    key: T,
    value: kintone.plugin.Condition[T]
  ) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index][key] = value;
      })
    );
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConditionProps('field', e.target.value);
  };

  return <StyledComponent {...{ condition, index, appFields, onChange }} />;
};

export default Container;
