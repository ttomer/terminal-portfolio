import React from 'react';
import * as bin from './bin';

export const shell = async (
  command: string,
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
  setOverlayUrl: React.Dispatch<React.SetStateAction<string | null>> // Add this parameter
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  if (args[0] === 'clear') {
    clearHistory();
  } else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else if (args[0] === 'portfolio' || args[0] === 'resume' || args[0] === 'github') {
    // Handle commands that need to open in iframe
    const urls: Record<string, string> = {
      portfolio: 'https://ttomer.github.io/portfolio_website/',
      resume: 'https://example.com/resume.pdf', // Replace with your resume URL
      github: 'https://github.com/yourusername', // Replace with your GitHub URL
    };
    const url = urls[args[0]];

    if (url) {
      setOverlayUrl(url);
      setHistory(`Opening ${args[0]}...`);
    } else {
      setHistory(`shell: URL not defined for ${args[0]}.`);
    }
  } else {
    // Handle other bin commands
    const output = await bin[args[0]](args.slice(1));
    setHistory(output);
  }

  setCommand('');
};
