import { Store } from '../entities/Store';

export type TPlugin<T> = (e: T, store: Store) => void;
