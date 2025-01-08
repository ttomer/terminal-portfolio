import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import styles from './index.module.css';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);
  const [showPortfolio, setShowPortfolio] = React.useState(false);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
        </div>
<div>
        {/* Button to trigger portfolio display */}
        <button
          className={styles.showPortfolioButton}
          onClick={() => setShowPortfolio(true)}
        >
          View Portfolio
        </button>

        {/* Overlay with iframe */}
        {showPortfolio && (
          <div className={styles.overlay}>
            <button
              className={styles.closeButton}
              onClick={() => setShowPortfolio(false)}
            >
              Close
            </button>
            <iframe
              src="https://ttomer.github.io/portfolio_website/"
              className={styles.iframe}
            />
          </div>
        )}</div>
      </div>
    </>
  );
};

export default IndexPage;
