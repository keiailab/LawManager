import { useEffect, useState } from 'react';
import { ensureDemoSeeded } from '../db/demoDb';

export function useDemoSeed() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureDemoSeeded();
    setReady(true);
  }, []);

  return ready;
}
