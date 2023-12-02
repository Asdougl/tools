
import { renderHook, act } from '@testing-library/react';
import {useToggle} from '.';

describe('useToggle', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should toggle the value', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should set the value to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set the value to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });
});