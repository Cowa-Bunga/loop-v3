import React from 'react';
import { render } from '@testing-library/react';
import Map from '../index';

describe('Map', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Map />);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
