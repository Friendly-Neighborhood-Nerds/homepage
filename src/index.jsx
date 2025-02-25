/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import {Header, Main, Footer} from './App';

const root = document.getElementsByTagName('body')[0];

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. What happened to your body element?',
  );
}

render(() => <>
  <Header />
  <Main />
  <Footer />
</>, root);
