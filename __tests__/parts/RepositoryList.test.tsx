import 'react-native';
import React from 'react';
import {RepositoryList} from '../../src/parts/RepositoryList';
import {renderWithProviders} from '../../src/utils/test-utils';
import {screen} from '@testing-library/react-native';

describe('RepositoryList ', () => {
  it('renders correctly with indicator', () => {
    renderWithProviders(<RepositoryList />);
    const indicator = screen.getAllByTestId('activityIndicator');

    expect(indicator.length).toEqual(1);
  });
});
