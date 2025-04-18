import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components';

describe('Input Component', () => {
  it('calls onChangeText when typing', () => {
    const onChangeTextMock = jest.fn();
    const placeholder = 'Enter text here';
    const { getByPlaceholderText } = render(
      <Input placeholder={placeholder} value="" onChangeText={onChangeTextMock} />
    );

    fireEvent.changeText(getByPlaceholderText(placeholder), 'Hello World');
    expect(onChangeTextMock).toHaveBeenCalledWith('Hello World');
  });
});
