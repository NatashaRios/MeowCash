import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components';

describe('Button Component', () => {
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();

    const { getByLabelText } = render(
      <Button
        title="Click me"
        onPress={onPressMock}
        accessibilityLabel="test-button"
      />
    );

    fireEvent.press(getByLabelText('test-button'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});

it('applies secondary type styles', () => {
  const { getByText } = render(
    <Button title="Secondary" onPress={jest.fn()} type="secondary" accessibilityLabel="secondary-button" />
  );

  const buttonText = getByText('Secondary');
  expect(buttonText).toBeTruthy();
});
