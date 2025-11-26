/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as data_impostor from "../data/impostor.js";
import type * as live_anonymous from "../live/anonymous.js";
import type * as live_game from "../live/game.js";
import type * as live_impostor from "../live/impostor.js";
import type * as live_reactionTime from "../live/reactionTime.js";
import type * as live_whoIs from "../live/whoIs.js";
import type * as types from "../types.js";
import type * as utils from "../utils.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "data/impostor": typeof data_impostor;
  "live/anonymous": typeof live_anonymous;
  "live/game": typeof live_game;
  "live/impostor": typeof live_impostor;
  "live/reactionTime": typeof live_reactionTime;
  "live/whoIs": typeof live_whoIs;
  types: typeof types;
  utils: typeof utils;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
