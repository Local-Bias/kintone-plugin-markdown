import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const main = (pluginId: string): void => {
  const root = document.getElementById('settings');

  if (!root) {
    console.error('コンポーネントをレンダリングする領域を取得できませんでした');
    return;
  }

  createRoot(root).render(<App pluginId={pluginId} />);
};

export default main;
