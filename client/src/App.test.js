import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders app properly', () => {
  render(
    <Provider store={store}>
      <App data-testid="test"/>
    </Provider>
  );

  expect(getByTestId("test")).toBeInTheDocument();
});
