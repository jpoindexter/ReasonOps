import { render } from '@testing-library/react';
import { StepScoringPanel } from '../components/StepScoringPanel';

test('renders step text', () => {
  const { getByText } = render(<StepScoringPanel step="Test reasoning" />);
  expect(getByText('Test reasoning')).toBeInTheDocument();
});