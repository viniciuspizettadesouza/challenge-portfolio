import { useLocation } from 'react-router-dom';

export default function Welcome() {
  const location = useLocation<{ firstName: string }>();
  const { firstName } = location.state || {};

  return <p>Hello {firstName} Test</p>;
}
