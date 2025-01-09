import React from 'react';
import { History } from './interface';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistory] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  const [overlayUrl, setOverlayUrl] = React.useState<string | null>(null); // Add state for overlay URL

  return {
    history,
    command,
    lastCommandIndex,
    overlayUrl, // Expose the overlay URL
    setHistory: (value: string) =>
      setHistory([
        ...history,
        {
          id: history.length,
          date: new Date(),
          command,
          output: value,
        },
      ]),
    setCommand,
    setLastCommandIndex,
    setOverlayUrl, // Expose the setter for the overlay URL
    clearHistory: () => setHistory([]),
  };
};
