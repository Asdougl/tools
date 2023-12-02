
import { renderHook, act } from '@testing-library/react';
import {useStateSet} from '.';

describe('useStateSet', () => {
  it('should initialize with an empty set', () => {
    const { result } = renderHook(() => useStateSet());

    expect(result.current.size).toBe(0);
  });

  it('should not replace the state set on re-render', () => {
    const { result, rerender } = renderHook(() => useStateSet(['item1']));

    expect(result.current.size).toBe(1);

    const setObj = result.current.state;

    act(() => {
      result.current.add('item2');
    });

    expect(result.current.size).toBe(2);

    rerender();

    expect(result.current.size).toBe(2);

    expect(setObj === result.current.state).toBe(true);
  })

  it('should add items to the set', () => {
    const { result } = renderHook(() => useStateSet());

    act(() => {
      result.current.add('item1');
      result.current.add('item2');
    });

    expect(result.current.size).toBe(2);
    expect(result.current.has('item1')).toBe(true);
    expect(result.current.has('item2')).toBe(true);
  });

  it('should remove items from the set', () => {
    const { result } = renderHook(() => useStateSet());

    act(() => {
      result.current.add('item1');
      result.current.add('item2');
      result.current.delete('item1');
    });

    expect(result.current.size).toBe(1);
    expect(result.current.has('item1')).toBe(false);
    expect(result.current.has('item2')).toBe(true);
  });

  it('should clear the set', () => {
    const { result } = renderHook(() => useStateSet());

    act(() => {
      result.current.add('item1');
      result.current.add('item2');
      result.current.clear();
    });

    expect(result.current.size).toBe(0);
    expect(result.current.has('item1')).toBe(false);
    expect(result.current.has('item2')).toBe(false);
  });

  it('should convert the set to an array', () => {
    const { result } = renderHook(() => useStateSet());

    act(() => {
      result.current.add('item1');
      result.current.add('item2');
    });

    expect(result.current.toArray()).toEqual(['item1', 'item2']);
  });

  it('should initialise the set with an array', () => {
    const { result } = renderHook(() => useStateSet(['item1', 'item2']));

    expect(result.current.toArray()).toEqual(['item1', 'item2']);
  })
});
