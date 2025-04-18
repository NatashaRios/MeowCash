import React from 'react';
import { render } from '@testing-library/react-native';
import { Heading1, Heading2, Heading3, Text1, Text2 } from '@/components';

describe('Text Components', () => {
  it('renders all text components correctly', () => {
    const { getByText } = render(
      <>
        <Heading1 text="Heading 1" accessibilityLabel="heading1" />
        <Heading2 text="Heading 2" accessibilityLabel="heading2" />
        <Heading3 text="Heading 3" accessibilityLabel="heading3" />
        <Text1 text="Text 1" accessibilityLabel="text1" />
        <Text2 text="Text 2" accessibilityLabel="text2" />
      </>
    );

    expect(getByText('Heading 1')).toBeTruthy();
    expect(getByText('Heading 2')).toBeTruthy();
    expect(getByText('Heading 3')).toBeTruthy();
    expect(getByText('Text 1')).toBeTruthy();
    expect(getByText('Text 2')).toBeTruthy();
  });
});