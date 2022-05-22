import { atom } from 'recoil';
import { getCurrentRecord, setCurrentRecord } from '@common/kintone';
import { marked } from 'marked';

export const pluginConditionState = atom<kintone.plugin.Condition | null>({
  key: 'pluginConditionState',
  default: null,
});

export const markdownState = atom<string>({
  key: 'richTextState',
  default: '',
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (newValue, oldValue) => {
        const html = marked.parse(newValue);
        const { record } = getCurrentRecord();
        const condition = await getPromise(pluginConditionState);
        if (!condition) {
          return;
        }
        record[condition.field].value = html;
        setCurrentRecord({ record });
      });
    },
  ],
});
