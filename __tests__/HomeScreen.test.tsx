import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../src/screens/home';
import {useGetPokemonsQuery} from '../src/redux/apiSlice';
import {useNavigation} from '@react-navigation/native';

jest.mock('../src/redux/apiSlice', () => ({
  useGetPokemonsQuery: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('HomeScreen', () => {
  test('renders loading state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  test('renders error state correctly', () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: true,
      isLoading: false,
    });
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Error loading data')).toBeTruthy();
  });

  test('renders list of Pokemon correctly', () => {
    const pokemonData = {
      results: [
        {name: 'bulbasaur', url: ''},
        {name: 'charmander', url: ''},
        {name: 'squirtle', url: ''},
      ],
    };
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: pokemonData,
      error: undefined,
      isLoading: false,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByText('charmander')).toBeTruthy();
    expect(getByText('squirtle')).toBeTruthy();
  });

  test('navigates to detail screen when Pokemon is pressed', () => {
    const mockNavigate = jest.fn();

    const pokemonData = {
      results: [
        {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
      ],
    };
    (useGetPokemonsQuery as jest.Mock).mockReturnValue({
      data: pokemonData,
      error: undefined,
      isLoading: false,
    });
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    const {getByText} = render(<HomeScreen />);
    const bulbasaurButton = getByText('bulbasaur');
    fireEvent.press(bulbasaurButton);
    expect(mockNavigate).toHaveBeenCalledWith('Details', {id: '1'});
  });
});
