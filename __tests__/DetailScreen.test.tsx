import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import DetailScreen from '../src/screens/detail';
import {NavigationContainer} from '@react-navigation/native';
import {useGetPokemonByIdQuery} from '../src/redux/apiSlice';
import {createStore} from '@reduxjs/toolkit';
import {useNavigation} from '@react-navigation/native';

const route = {
  params: {
    name: 'bulbasaur',
  },
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('../src/redux/apiSlice', () => ({
  useGetPokemonByIdQuery: jest.fn(),
}));

describe('DetailScreen', () => {
  test('renders loading state correctly', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    const store = createStore((innerState: any) => innerState, {});

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <DetailScreen route={route as any} />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  test('renders error state correctly', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });
    const store = createStore((innerState: any) => innerState, {});

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <DetailScreen route={route as any} />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Error loading data')).toBeTruthy();
  });

  test("sets navigation title to Pokemon's name with the first letter capitalized", () => {
    const pokemonData = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [
        {
          slot: 1,
          type: {name: 'grass', url: ''},
        },
      ],
    };
    const store = createStore((innerState: any) => innerState, {});

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: pokemonData,
      error: undefined,
      isLoading: false,
    });

    const setOptionsMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: setOptionsMock,
      setOptions: setOptionsMock,
    });
    render(
      <Provider store={store}>
        <NavigationContainer>
          <DetailScreen route={route as any} />
        </NavigationContainer>
      </Provider>,
    );

    expect(setOptionsMock).toHaveBeenCalledWith({title: 'Bulbasaur'});
  });

  test('handles empty data gracefully', () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue({
      data: {},
      error: undefined,
      isLoading: false,
    });
    const store = createStore((innerState: any) => innerState, {});

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <DetailScreen route={route as any} />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Name:')).toBeTruthy();
    expect(getByText('Height:')).toBeTruthy();
    expect(getByText('Weight:')).toBeTruthy();
    expect(getByText('Types:')).toBeTruthy();
  });
});
