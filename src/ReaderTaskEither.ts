import { Alt3 } from './Alt'
import { Bifunctor3 } from './Bifunctor'
import { Either } from './Either'
import { Predicate, Refinement } from './function'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { MonadIO3 } from './MonadIO'
import { MonadTask3 } from './MonadTask'
import { MonadThrow3 } from './MonadThrow'
import { Reader } from './Reader'
import { getReaderM } from './ReaderT'
import { Task } from './Task'
import * as TE from './TaskEither'

import TaskEither = TE.TaskEither
import { Option } from './Option'
import { IO } from './IO'

const T = getReaderM(TE.taskEither)

declare module './HKT' {
  interface URI2HKT3<U, L, A> {
    ReaderTaskEither: ReaderTaskEither<U, L, A>
  }
}

export const URI = 'ReaderTaskEither'

export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface ReaderTaskEither<E, L, A> {
  (e: E): TaskEither<L, A>
}

/**
 * @since 2.0.0
 */
export function run<E, L, A>(ma: ReaderTaskEither<E, L, A>, e: E): Promise<Either<L, A>> {
  return ma(e)()
}

/**
 * @since 2.0.0
 */
export function left<L>(l: L): ReaderTaskEither<unknown, L, never> {
  return fromTaskEither(TE.left(l))
}

/**
 * @since 2.0.0
 */
export const right: <A>(a: A) => ReaderTaskEither<unknown, never, A> = T.of

/**
 * @since 2.0.0
 */
export function rightTask<A>(ma: Task<A>): ReaderTaskEither<unknown, never, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @since 2.0.0
 */
export function leftTask<L>(ma: Task<L>): ReaderTaskEither<unknown, L, never> {
  return fromTaskEither(TE.leftTask(ma))
}

/**
 * @since 2.0.0
 */
export const fromTaskEither: <L, A>(ma: TaskEither<L, A>) => ReaderTaskEither<unknown, L, A> = T.fromM

/**
 * @since 2.0.0
 */
export const rightReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A> = T.fromReader

/**
 * @since 2.0.0
 */
export function leftReader<E, L>(ml: Reader<E, L>): ReaderTaskEither<E, L, never> {
  return e => TE.left(ml(e))
}

/**
 * @since 2.0.0
 */
export function fromIOEither<L, A>(ma: IOEither<L, A>): ReaderTaskEither<unknown, L, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromEither<L, A>(ma: Either<L, A>): ReaderTaskEither<unknown, L, A> {
  return fromTaskEither(TE.fromEither(ma))
}

/**
 * @since 2.0.0
 */
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): ReaderTaskEither<unknown, L, A> {
  return fromTaskEither(TE.fromOption(ma, onNone))
}

/**
 * @since 2.0.0
 */
export function rightIO<A>(ma: IO<A>): ReaderTaskEither<unknown, never, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @since 2.0.0
 */
export function leftIO<L>(ml: IO<L>): ReaderTaskEither<unknown, L, never> {
  return fromTaskEither(TE.leftIO(ml))
}

/**
 * @since 2.0.0
 */
export function fromPredicate<L, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<unknown, L, B>
export function fromPredicate<L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<unknown, L, A>
export function fromPredicate<L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<unknown, L, A> {
  const f = TE.fromPredicate(predicate, onFalse)
  return a => fromTaskEither(f(a))
}

/**
 * @since 2.0.0
 */
export function fold<E, L, A, R>(
  ma: ReaderTaskEither<E, L, A>,
  onLeft: (l: L) => R,
  onRight: (a: A) => R
): Reader<E, Task<R>> {
  return e => TE.fold(ma(e), onLeft, onRight)
}

/**
 * @since 2.0.0
 */
export function orElse<E, L, A, M>(
  ma: ReaderTaskEither<E, L, A>,
  f: (l: L) => ReaderTaskEither<E, M, A>
): ReaderTaskEither<E, M, A> {
  return e => TE.orElse(ma(e), l => f(l)(e))
}

/**
 * @since 2.0.0
 */
export const ask: <E>() => ReaderTaskEither<E, never, E> = T.ask

/**
 * @since 2.0.0
 */
export const asks: <E, A>(f: (e: E) => A) => ReaderTaskEither<E, never, A> = T.asks

/**
 * @since 2.0.0
 */
export const local: <E, L, A, D>(ma: ReaderTaskEither<E, L, A>, f: (f: D) => E) => ReaderTaskEither<D, L, A> = T.local

/**
 * @since 2.0.0
 */
export const readerTaskEither: Monad3<URI> &
  Bifunctor3<URI> &
  Alt3<URI> &
  MonadIO3<URI> &
  MonadTask3<URI> &
  MonadThrow3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  alt: orElse,
  bimap: (ma, f, g) => e => TE.taskEither.bimap(ma(e), f, g),
  mapLeft: (ma, f) => e => TE.taskEither.mapLeft(ma(e), f),
  fromIO: rightIO,
  fromTask: rightTask,
  throwError: left,
  fromEither,
  fromOption
}

/**
 * Like `readerTaskEither` but `ap` is sequential
 * @since 2.0.0
 */
export const readerTaskEitherSeq: typeof readerTaskEither = {
  ...readerTaskEither,
  ap: (fab, fa) => T.chain(fab, f => T.map(fa, f))
}
