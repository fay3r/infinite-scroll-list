import React from 'react';
import {Text} from 'react-native';
import InfiniteScrollList, {
  InfiniteScrollListProps,
} from '../../src/components/InfiniteScrollList';
import {render, screen} from '@testing-library/react-native';

describe('Infinite Scroll List', () => {
  let props: InfiniteScrollListProps<any>;

  beforeEach(() => {
    props = {
      data: [],
      keyExtractor: jest.fn(),
      renderItem: jest.fn(),
      onEndReached: jest.fn(),
      isEndReached: false,
      isLoading: false,
      enableSearch: false,
      error: null,
    };
  });
  it('should renders empty list', () => {
    render(<InfiniteScrollList {...props} />);
    const emptyText = screen.getAllByText('No items to show');
    expect(emptyText.length).toBeGreaterThan(0);
  });

  it('should renders list with 2 items', () => {
    props.data = [{name: 'item1'}, {name: 'item2'}];
    props.renderItem = () => <Text>item</Text>;
    props.keyExtractor = (item: {name: string}) => item.name;
    render(<InfiniteScrollList {...props} />);

    const items = screen.getAllByText('item');

    expect(items.length).toEqual(2);
  });

  it('should render Search bar', () => {
    props.enableSearch = true;
    render(<InfiniteScrollList {...props} />);

    const searchBar = screen.getAllByPlaceholderText('Search...');

    expect(searchBar.length).toEqual(1);
  });

  it('should render no more data', () => {
    props.data = [{name: 'item'}];
    props.keyExtractor = (item: {name: string}) => item.name;
    props.isEndReached = true;
    render(<InfiniteScrollList {...props} />);

    const searchBar = screen.getAllByText('No more data to load');

    expect(searchBar.length).toEqual(1);
  });

  it('should render error', () => {
    props.data = [{name: 'item'}];
    props.keyExtractor = (item: {name: string}) => item.name;
    props.error = 'testing error';
    render(<InfiniteScrollList {...props} />);

    const searchBar = screen.getAllByText('testing error');

    expect(searchBar.length).toEqual(1);
  });
});
