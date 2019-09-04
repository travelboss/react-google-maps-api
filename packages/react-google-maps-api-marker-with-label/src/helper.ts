function forEach (obj: any, fn: any): any {
  Object.keys(obj).forEach(function iterator(key) {
    return fn(obj[key], key)
  })
}

export const applyUpdaterToNextProps = (
  updaterMap: any,
  prevProps: any,
  nextProps: any,
  // eslint-disable-next-line @getify/proper-arrows/params
  instance: any
): any => {
  let map: any = {}

  const iter = (fn: any, key: string) => {
    const nextValue = nextProps[key]

    if (nextValue !== prevProps[key]) {
      map[key] = nextValue
      fn(instance, nextValue)
    }
  }

  forEach(updaterMap, iter)

  return map
}

/**
 * @param {Function} childCtor Child class.
 * @param {Function} parentCtor Parent class.
 * @private
 */
export const inherits = (childCtor: any, parentCtor: any): any => {
  /* @constructor */
  function tempCtor() {}
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  // @ts-ignore
  childCtor.prototype = new tempCtor();
  /* @override */
  childCtor.prototype.constructor = childCtor;
}