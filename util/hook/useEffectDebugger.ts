import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const usePrevious = (value: any, initialValue: never[]) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (
  effectHook: EffectCallback,
  dependencies: any[] | DependencyList | undefined,
  dependencyNames = []
) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies?.reduce(
    (accum: any, dependency: any, index: number) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {}
  );

  if (Object.keys(changedDeps).length) {
    console.log("[use-effect-debugger] ", changedDeps);
  }

  useEffect(effectHook, dependencies);
};

export default useEffectDebugger;
