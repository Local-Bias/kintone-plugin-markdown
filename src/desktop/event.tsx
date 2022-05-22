import React from 'react';
import { createRoot } from 'react-dom/client';
import { restoreStorage } from '@common/plugin';
import { getAlertElement } from '@common/utility';
import { getFields } from '@common/cybozu';
import { convert } from 'html-to-markdown';

import App from './app';

const events: launcher.Events = ['app.record.edit.show', 'app.record.create.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const fields = getFields();

  for (const condition of config.conditions) {
    const target = fields.find((field) => field.var === condition.field);

    const targetElement = document.querySelector(`.value-${target?.id}`);

    if (!targetElement) {
      document.body.append(
        getAlertElement(
          `マークダウンエディタ プラグインに設定したフィールド(${condition.field})が存在しないため、エディタを表示することができませんでした。`
        )
      );
      continue;
    }

    const markdown: string = convert(event.record[condition.field]?.value || '');

    createRoot(targetElement).render(<App condition={condition} initialMarkdown={markdown} />);
  }

  return event;
};

export default { events, action };
