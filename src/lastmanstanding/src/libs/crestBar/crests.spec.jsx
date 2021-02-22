import React from 'react';
import {shallow} from 'enzyme';
import Crests from './crests';

describe('crestBar', () => {
  const props = {
    screenWidth: 1000,
    crests: [
      {
        'Abbreviation': 'ARS',
        'Crest': 'https://crests.football-data.org/57.svg',
        'TeamName': 'Arsenal FC',
        'Website': 'https://www.arsenal.com/',
      },
      {
        'Abbreviation': 'AVL',
        'Crest': 'https://crests.football-data.org/58.svg',
        'TeamName': 'Aston Villa FC',
        'Website': 'https://www.avfc.co.uk/',
      },
    ],
  };
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <Crests {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('crests', () => {
    it('redirects to logo page', async () => {
      const component = shallow(
          <Crests {...props}/>,
      );
      expect(component.find('a').at(0).prop('href')).toBe('https://www.arsenal.com/');
    });
  });
});
