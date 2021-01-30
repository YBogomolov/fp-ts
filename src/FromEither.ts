/**
 * The `FromEither` type class represents those data types which support errors.
 *
 * @since 2.10.0
 */

import * as E from './Either'
import { flow, Lazy, Predicate, Refinement } from './function'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import { Monad, Monad2, Monad2C, Monad3, Monad3C, Monad4 } from './Monad'
import { Option } from './Option'

import Either = E.Either

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither<F> {
  readonly URI: F
  readonly fromEither: <E, A>(e: Either<E, A>) => HKT2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither2<F extends URIS2> {
  readonly URI: F
  readonly fromEither: <E, A>(e: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E?: E
  readonly fromEither: <A>(e: Either<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither3<F extends URIS3> {
  readonly URI: F
  readonly fromEither: <R, E, A>(e: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E?: E
  readonly fromEither: <R, A>(e: Either<E, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface FromEither4<F extends URIS4> {
  readonly URI: F
  readonly fromEither: <S, R, E, A>(e: Either<E, A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function fromOption<F extends URIS4>(
  F: FromEither4<F>
): <E>(onNone: Lazy<E>) => <S, R, A>(ma: Option<A>) => Kind4<F, S, R, E, A>
export function fromOption<F extends URIS3>(
  F: FromEither3<F>
): <E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (onNone: Lazy<E>) => <A, R>(ma: Option<A>) => Kind3<F, R, E, A>
export function fromOption<F extends URIS2>(
  F: FromEither2<F>
): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
export function fromOption<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: Lazy<E>) => <A>(ma: Option<A>) => Kind2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A>
export function fromOption<F>(F: FromEither<F>): <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => HKT2<F, E, A> {
  return (onNone) => flow(E.fromOption(onNone), F.fromEither)
}

/**
 * @since 2.10.0
 */
export function fromPredicate<F extends URIS4>(
  F: FromEither4<F>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(a: A) => Kind4<F, S, R, E, A>
}
export function fromPredicate<F extends URIS3>(
  F: FromEither3<F>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS3, E>(
  F: FromEither3C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => Kind3<F, R, E, A>
}
export function fromPredicate<F extends URIS2>(
  F: FromEither2<F>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F extends URIS2, E>(
  F: FromEither2C<F, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
}
export function fromPredicate<F>(
  F: FromEither<F>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT2<F, E, A>
} {
  return <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) =>
    flow(E.fromPredicate(predicate, onFalse), F.fromEither)
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export function fromOptionK<F extends URIS4>(
  F: FromEither4<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromOptionK<F extends URIS3>(
  F: FromEither3<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS3, E>(
  F: FromEither3C<F, E>
): (
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromOptionK<F extends URIS2>(
  F: FromEither2<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F extends URIS2, E>(
  F: FromEither2C<F, E>
): (onNone: Lazy<E>) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Kind2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B>
export function fromOptionK<F>(
  F: FromEither<F>
): <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => HKT2<F, E, B> {
  const fromOptionF = fromOption(F)
  return (onNone) => {
    const from = fromOptionF(onNone)
    return (f) => flow(f, from)
  }
}

/**
 * @since 2.10.0
 */
export function filterOrElse<M extends URIS4>(
  M: FromEither4<M> & Monad4<M>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S, R>(
    ma: Kind4<M, S, R, E, A>
  ) => Kind4<M, S, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, R>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
}
export function filterOrElse<M extends URIS3>(
  M: FromEither3<M> & Monad3<M>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: Kind3<M, R, E, A>
  ) => Kind3<M, R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS3, E>(
  M: FromEither3C<M, E> & Monad3C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
}
export function filterOrElse<M extends URIS2>(
  M: FromEither2<M> & Monad2<M>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2, E>(
  M: FromEither2C<M, E> & Monad2C<M, E>
): {
  <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  M: FromEither<M> & Monad<M>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT2<M, E, A>) => HKT2<M, E, A>
}
export function filterOrElse<M extends URIS2>(
  M: FromEither2<M> & Monad2<M>
): {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<M, E, A>) => Kind2<M, E, A>
} {
  return <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (ma: Kind2<M, E, A>): Kind2<M, E, A> =>
    M.chain(ma, flow(E.fromPredicate(predicate, onFalse), M.fromEither))
}
