import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from '@/components';

describe('Spacer Component', () => {
  it('applies the correct marginHorizontal and marginVertical', () => {
    const { getByTestId } = render(<Spacer marginHorizontal={10} marginVertical={20} />);

    const spacer = getByTestId('spacer');

    expect(spacer.props.style.marginHorizontal).toBe(10);
    expect(spacer.props.style.marginVertical).toBe(20);
  });
});
