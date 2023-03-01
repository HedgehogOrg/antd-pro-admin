/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 15:29:31
 * Last Modified: 2022-04-14 16:43:40
 * Description:
 */

export function Mixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      const descriptors = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
      if (descriptors) {
        Object.defineProperty(derivedCtor.prototype, name, descriptors);
      }
    });
  });
}
