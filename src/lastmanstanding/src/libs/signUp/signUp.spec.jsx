import React from 'react';
import {shallow} from 'enzyme';
import SignUp from './signUp';
import {fireEvent, render} from '@testing-library/react';

describe('joinLeagues', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  describe('Snapshot', () => {
    it('renders teams', () => {
      const component = shallow(
          <SignUp/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('textFields', () => {
    it('updates username', () => {
      const {getByTestId} = render(<SignUp/>);
      const element = getByTestId('username');
      fireEvent.change(element, {target: {value: 'mockUsername'}});
      expect(element).toHaveValue('mockUsername');
    });
    it('updates email', () => {
      const {getByTestId} = render(<SignUp/>);
      const element = getByTestId('email');
      fireEvent.change(element, {target: {value: 'mockEmail'}});
      expect(element).toHaveValue('mockEmail');
    });
    it('updates password', () => {
      const {getByTestId} = render(<SignUp/>);
      const element = getByTestId('password');
      fireEvent.change(element, {target: {value: 'mockPassword'}});
      expect(element).toHaveValue('mockPassword');
    });
  });
});