import { useSyncExternalStore } from 'react';
import { getDemoStateSnapshot, subscribeDemoState } from '../db/demoDb';

export function useDemoSnapshot() {
  return useSyncExternalStore(subscribeDemoState, getDemoStateSnapshot, getDemoStateSnapshot);
}
