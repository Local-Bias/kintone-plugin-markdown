import { css } from '@emotion/css';

export const getAlertElement = (text: string): HTMLDivElement => {
  const element = document.createElement('div');
  element.textContent = text;
  element.classList.add(css`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: #ffcaca77;
    color: rgb(239 68 68);
    font-size: 80%;
    padding: 1rem 1.5rem;
    border-radius: 4px;
    box-shadow: 0 1px 3px -1px #0003, 0 2px 5px -2px #0002;
    backdrop-filter: blur(4px);
  `);
  return element;
};
