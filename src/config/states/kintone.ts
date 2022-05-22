import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getUserDefinedFields } from '@common/kintone-api';
import { kx } from '../../types/kintone-field';

export const appFieldsState = selector<Properties>({
  key: 'appFieldsState',
  get: async () => {
    const properties = await getUserDefinedFields();
    return properties;
  },
});

export const richTextFieldsState = selector<kx.Field[]>({
  key: 'richTextFieldsState',
  get: async ({ get }) => {
    const allFields = await get(appFieldsState);

    return Object.values(allFields).filter((field) => field.type === 'RICH_TEXT');
  },
});
