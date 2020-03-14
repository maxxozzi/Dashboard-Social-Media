import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../state/reducer';
import User from './User';

afterEach(cleanup);

function renderWithRedux(
    ui,
    { store = createStore(reducer) } = {}
  ) {
    return {
      ...render(<Provider store={store}>{ui}</Provider>),
      store,
    }
  }

test('fetch API and display user list data', async () => {
    const fakeUserResponse = [
        {id: 1, name: 'testing', username: 'test', email: 'test@email.com'}
    ]
    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
            json: () => Promise.resolve(fakeUserResponse),
        })
    })
    const { getByText } = renderWithRedux(<User />);
    const tableHeader = await waitForElement(() => getByText("Name"));
    const tableBody = await waitForElement(() => getByText("testing"));
    expect(tableHeader).toBeInTheDocument();
    expect(tableBody).toBeInTheDocument();
  });

