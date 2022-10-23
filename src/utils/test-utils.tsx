import {render, RenderOptions} from '@testing-library/react-native';
import {configureStore, PreloadedState} from '@reduxjs/toolkit';
import {AppStore, RootState} from '../redux/store';
import githubReducer, {ApiStatus} from '../redux/githubSlice';
import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      github: {
        githubEvents: [],
        nextPage: 1,
        status: ApiStatus.IDLE,
        isEndReached: false,
        error: null,
        initialLoading: true,
      },
    },
    store = configureStore({reducer: {github: githubReducer}, preloadedState}),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
