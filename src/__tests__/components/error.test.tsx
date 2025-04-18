import React from 'react';
import { render } from '@testing-library/react-native';
import { Error } from '@/components';

describe('Error Component', () => {
  it('renders title and description correctly', () => {
    const title = 'Error';
    const description = 'Something went wrong';

    const { getByText } = render(
      <Error title={title} description={description} />
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(description)).toBeTruthy();
  });
});
