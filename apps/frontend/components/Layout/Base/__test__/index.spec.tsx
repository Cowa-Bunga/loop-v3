import React from 'react';
import { render } from '@testing-library/react';
import LayoutBase from '../index';
import { withMockAuth } from '@tomfreudenberg/next-auth-mock/jest';

describe('LayoutBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      withMockAuth(<LayoutBase>panel</LayoutBase>)
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
});
