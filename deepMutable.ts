export type DeepMutable<T> = T extends any[] ? DeepMutableArray<T[number]>
    : T extends object ? DeepMutableObject<T>
    : T;

interface DeepMutableArray<T> extends Array<DeepMutable<T>> {}

type DeepMutableObject<T> = {
    -readonly [K in keyof T]: DeepMutable<T[K]>;
};
