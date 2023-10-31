import { useContext, useEffect, useState, CSSProperties } from 'react';
import ThemeContext from '../contexts/ThemeContext';

interface AlertProps {
  message?: string;
  show?: boolean;
}

const Alert = ({ message, show }: AlertProps) => {
  const [display, setDisplay] = useState(show);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (show) {
      setDisplay(show);
    }
  }, [show]);

  const style: CSSProperties = {
    visibility: display ? 'visible' : 'hidden',
    opacity: display ? 1 : 0,
    transform: display ? 'scale(1)' : 'scale(0)',
  };

  return (
    <aside className="alert" style={style}>
      <span>🤔</span>
      <p style={{ color: theme === 'light' ? 'black' : 'black' }}>{message}</p>
      <button onClick={() => setDisplay(false)}>OKAY</button>
    </aside>
  );
};

export default Alert;
