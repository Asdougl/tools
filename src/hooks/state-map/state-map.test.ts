
import { renderHook, act } from '@testing-library/react';
import {useStateMap} from '.';

describe('useStateMap', () => {
  it('should initialize with an empty map', () => {
    const { result } = renderHook(() => useStateMap());

    expect(result.current.size).toBe(0);
  });

  it('should not replace the state map on re-render', () => {
    const { result, rerender } = renderHook(() => useStateMap({ key1: 'value1' }));

    expect(result.current.size).toBe(1);

    const mapObj = result.current.state;

    act(() => {
      result.current.set('key1', 'value2');
    });

    expect(result.current.size).toBe(1);

    rerender();

    expect(result.current.size).toBe(1);

    expect(mapObj === result.current.state).toBe(true);
  })

  it('should update the state map correctly', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.get('key1')).toBe('value1');

    act(() => {
      result.current.set('key2', 'value2');
    });

    expect(result.current.get('key2')).toBe('value2');
    expect(result.current.size).toBe(2);
  });

  it('should remove an entry from the state map correctly', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    act(() => {
      result.current.delete('key1');
    });

    expect(result.current.get('key1')).toBeUndefined();
    expect(result.current.get('key2')).toBe('value2');
    expect(result.current.size).toBe(1);
  });

  it('should clear the state map correctly', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    act(() => {
      result.current.clear();
    });

    expect(result.current.get('key1')).toBeUndefined();
    expect(result.current.get('key2')).toBeUndefined();
    expect(result.current.size).toBe(0);
  });

  it('should return the correct values', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    expect(Array.from(result.current.values())).toEqual(['value1', 'value2']);
    expect(Array.from(result.current.keys())).toEqual(['key1', 'key2']);
    expect(Array.from(result.current.entries())).toEqual([['key1', 'value1'], ['key2', 'value2']]);
  });

  it('should return the correct size', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
      result.current.set('key2', 'value2');
    });

    expect(result.current.size).toBe(2);
  });

  it('should return the correct has value', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.has('key1')).toBe(true);
    expect(result.current.has('key2')).toBe(false);
  });

  it('should return the correct get value', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(result.current.get('key1')).toBe('value1');
    expect(result.current.get('key2')).toBeUndefined();
  });

  it('should return the correct entries', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(Array.from(result.current.entries())).toEqual([['key1', 'value1']]);
  });

  it('should return the correct keys', () => {
    const { result } = renderHook(() => useStateMap());

    act(() => {
      result.current.set('key1', 'value1');
    });

    expect(Array.from(result.current.keys())).toEqual(['key1']);
  });

  it('should be initialised from an object', () => {
    const { result } = renderHook(() => useStateMap({ key1: 'value1', key2: 'value2' }));

    expect(result.current.get('key1')).toBe('value1');
    expect(result.current.get('key2')).toBe('value2');
    expect(result.current.size).toBe(2);
  })
});
