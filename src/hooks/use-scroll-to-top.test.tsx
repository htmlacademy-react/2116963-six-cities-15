import { renderHook } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../mock/history-router';
import useScrollToTop from './use-scroll-to-top';

describe('useScrollToTop', () => {
  it('should call window.scrollTo when pathname changes', () => {
    const history = createMemoryHistory();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    renderHook(() => useScrollToTop(), {
      wrapper: ({ children }) => <HistoryRouter history={history}>{children}</HistoryRouter>,
    });

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    expect(scrollToMock).toBeCalledTimes(1);
  });
});
