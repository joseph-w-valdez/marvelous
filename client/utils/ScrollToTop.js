import { useEffect } from 'react';

export const ScrollToTopOnPageChange = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls the page to the top on page change
  }, []);
};
