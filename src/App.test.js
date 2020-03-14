import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './state/reducer';
import App from './App';

function renderWithRedux(
  ui,
  { store = createStore(reducer) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

test('test render navbar', () => {
  const { getByText } = renderWithRedux(<App />);
  const linkElement = getByText(/dashboard social media/i);
  expect(linkElement).toBeInTheDocument();
});
