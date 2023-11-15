import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Comunication } from './comunication';

describe('Given Comunication component', () => {
  describe('When we instantiate', () => {
    const title = 'test';

    beforeEach(() => {
      render(<Comunication quote={title}></Comunication>);
    });

    test('Then it should be in the document', () => {
      const element = screen.getByRole('img');
      expect(element).toBeInTheDocument();
    });

    test('Then it should render the title', () => {
      const element = screen.getByText(title);
      expect(element).toBeInTheDocument();
    });
  });
});
