
import { renderHook, act } from '@testing-library/react';
import {useDebouncedState} from '.';

describe('useDebouncedState', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  })

  afterAll(() => {
    vi.clearAllTimers();
  })

  it('should update the internal state immediately', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 100));

    // debounced state
    expect(result.current[0]).toBe('initial');
    // setter
    expect(result.current[1]).toBeInstanceOf(Function);
    // has debounced (is debounced === value)
    expect(result.current[2]).toBe(true);
    // current value (undebounced)
    expect(result.current[3]).toBe('initial');

    act(() => {
      result.current[1]('updated');
    });

    // debounced state
    expect(result.current[0]).toBe('initial');
    expect(result.current[2]).toBe(false);
    expect(result.current[3]).toBe('updated');
  });

  it('should debounce state updates', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 100));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('initial');
    expect(result.current[2]).toBe(false);
    expect(result.current[3]).toBe('updated');

    act(() => {
      vi.advanceTimersByTime(100);
    })

    expect(result.current[0]).toBe('updated');
    expect(result.current[2]).toBe(true);
    expect(result.current[3]).toBe('updated');
  });
});
