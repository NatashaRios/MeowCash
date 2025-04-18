import React from 'react';
import { render } from '@testing-library/react-native';
import { Loader } from '@/components';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Loader Component', () => {
  it('renders the loader correctly', () => {
    const { getByTestId } = render(<Loader />);

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('has the correct accessibility label', () => {
    const { getByLabelText } = render(<Loader />);

    expect(getByLabelText('loader')).toBeTruthy();
  });

  it('shows the ActivityIndicator with the correct color', () => {
    const { getByTestId } = render(<Loader />);

    const loader = getByTestId('loader');
    expect(loader.props.color).toBe('#E091D0');
  });
});

