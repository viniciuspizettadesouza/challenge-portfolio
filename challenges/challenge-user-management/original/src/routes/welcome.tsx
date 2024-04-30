import { useLocation } from 'react-router-dom';

export default function Welcome() {
  const location = useLocation<{ firstName: string }>();
  const { firstName } = location.state || { firstName: '' };

  return <p>Hello {firstName}</p>;
}
