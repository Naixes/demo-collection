import { useCallback, useEffect, useState } from 'react';
import { tuplify } from '../utils';

interface Disconnect {
  disconnect: () => void;
}

// 观察者模式，mobx是proxy，性能好一点
class Stateful<T> {
  // ts会自动把value注入到this
  constructor(protected value: T) {}

  private listeners = new Set<(value: T) => void>();

  public subscribe(callback: (value: T) => void): Disconnect {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }

  public snapshot(): T {
    return this.value;
  }

  // 执行回调
  public emit() {
    console.log('update');
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      // 触发监听
      this.emit();
    }
  }
}

class Atomic<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}

// 自己重新维护了一套新的状态栈
class Selector<T> extends Stateful<T> {
  constructor(private readonly generator: SelectorGenerator<T>) {
    // 自己维护的状态
    super(undefined as any);
    this.value = generator({ get: (dep: Atomic<any>) => this.addSub(dep) });
  }
  // 维护Atomic的变化
  private registerDeps = new Set<Atomic<any>>();
  private addSub(dep: Atomic<any>) {
    if (!this.registerDeps.has(dep)) {
      dep.subscribe(() => this.updateSelector());
      // 添加依赖
      this.registerDeps.add(dep);
    }
    return dep.snapshot();
  }
  private updateSelector() {
    this.update(
      this.generator({ get: (dep: Atomic<any>) => this.addSub(dep) })
    );
  }
}

// 暴露方法

// unknow，不能交互
export function atom<T>(value: { key: string; default: T }) {
  return new Atomic<T>(value.default);
}

// class作为类型
export function useRecoilValue<T>(value: Stateful<T>) {
  // 强制react组件更新，源码用的数组
  // 订阅事件
  const [, updateState] = useState({});
  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}));
    // 释放订阅，防止内存泄漏，所以要写在副作用中
    return () => disconnect();
  }, [value]);

  return value.snapshot();
}

export function useRecoilState<T>(atom: Atomic<T>) {
  const value = useRecoilValue(atom);
  // 返回[value, setValue]
  // 使用useCallback优化函数，防止每次刷新会话具柄都改变引起子组件不必要的更新
  return tuplify(
    value,
    useCallback((value: T) => atom.setState(value), [atom])
  );
}

// const charCountState = selector({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     // selector的get，取值
//     get: ({ get }) => {
//         // 内部解构的get，可以获取原子的state，可以同步变
//         const text = get(textState);
//         return text.length;
//     },
// });
type SelectorGenerator<V> = (context: { get: <T>(dep: Atomic<T>) => T }) => V;
export function selector<T>(value: { key: string; get: SelectorGenerator<T> }) {
  return new Selector(value.get);
}
