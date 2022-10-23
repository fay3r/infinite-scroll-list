import 'react-native';
import React from 'react';
import {GithubEventItem} from '../../src/components/GithubEventItem';
// Note: test renderer must be required after react-native.
import {AppGithubEventType} from '../../src/@types/GithubEventType';
import {render, screen} from '@testing-library/react-native';

describe('<GithubEventItem/>', () => {
  const props: {itemData: AppGithubEventType} = {
    itemData: {
      id: 'uniqueId',
      repoName: 'test Repo Name',
      login: 'Test Login',
      avatarUrl: 'https',
    },
  };

  it('renders correctly with passed props', () => {
    render(<GithubEventItem {...props} />);

    const login = screen.getAllByText('Test Login');
    const repoName = screen.getAllByText('test Repo Name');

    expect(login.length).toEqual(1);
    expect(repoName.length).toEqual(1);
  });
});
