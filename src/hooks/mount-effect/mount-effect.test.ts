
import { renderHook } from '@testing-library/react';
import { useMountEffect } from '.';
describe('useMountEffect', () => {
  test('should call effect function on mount', () => {
    const effectFn = vi.fn();
    renderHook(() => useMountEffect(effectFn));

    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  test('should not call effect function on update', () => {
    const effectFn = vi.fn();
    const { rerender } = renderHook(() => useMountEffect(effectFn));

    rerender();

    expect(effectFn).toHaveBeenCalledTimes(1);
  });
});
