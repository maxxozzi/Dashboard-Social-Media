import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState, reducer } from '../state/reducer';
import Album from './Album';

afterEach(cleanup);

function renderWithRedux(
    ui,
    { initialState, store = createStore(reducer, initialState) } = {}
  ) {
    return {
      ...render(<Provider store={store}>{ui}</Provider>),
      store,
    }
  }

test('get data from redux state then display album list', async () => {
    const { getByText } = renderWithRedux(<Album />, {
        initialState: { 
            albumList: [
                {id: 1, title: 'testing title'}
            ]
        },
    })
    const tableHeader = await waitForElement(() => getByText("Title"));
    const tableBody = await waitForElement(() => getByText("testing title"));
    expect(tableHeader).toBeInTheDocument();
    expect(tableBody).toBeInTheDocument();
  });
