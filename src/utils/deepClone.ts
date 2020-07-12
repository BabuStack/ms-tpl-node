import ObjectAssignDeep from 'object-assign-deep';

export default function deepClone<T>(obj: T): T {
  return (ObjectAssignDeep as any).noMutate({}, obj);
}