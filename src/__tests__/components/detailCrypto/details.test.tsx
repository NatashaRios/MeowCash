import React from 'react';
import { render } from '@testing-library/react-native';
import { Details } from '@/components';

describe('Details Component', () => {
  it('renders price, percentChange, and volume correctly with accessibility labels', () => {
    const price = '$1500';
    const percentChange = '+3.5%';
    const color = 'green';
    const volume = 'Volumen: $2M';

    const { getByText } = render(
      <Details
        price={price}
        percentChange={percentChange}
        color={color}
        volume={volume}
      />
    );

    expect(getByText(price)).toBeTruthy();
    expect(getByText(percentChange)).toBeTruthy();
    expect(getByText(volume)).toBeTruthy();
  });
});
