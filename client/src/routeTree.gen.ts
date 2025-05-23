/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ErrorImport } from './routes/error'
import { Route as DebugImport } from './routes/debug'
import { Route as VattenfallRouteImport } from './routes/vattenfall/route'
import { Route as PromptpartyRouteImport } from './routes/promptparty/route'
import { Route as LiftRouteImport } from './routes/lift/route'
import { Route as DrinkwheelRouteImport } from './routes/drinkwheel/route'
import { Route as IndexImport } from './routes/index'
import { Route as PromptpartySelectGameJoinTypeImport } from './routes/promptparty/select-game-join-type'
import { Route as PromptpartyJoinGameImport } from './routes/promptparty/join-game'
import { Route as PromptpartyHostGameImport } from './routes/promptparty/host-game'
import { Route as LiftSelectGameJoinTypeImport } from './routes/lift/select-game-join-type'
import { Route as LiftJoinGameImport } from './routes/lift/join-game'
import { Route as LiftHostGameImport } from './routes/lift/host-game'
import { Route as PromptpartyActiveLobbyImport } from './routes/promptparty/active/lobby'
import { Route as LiftActiveLobbyImport } from './routes/lift/active/lobby'
import { Route as PromptpartyActivePinShowImport } from './routes/promptparty/active/$pin/show'
import { Route as PromptpartyActivePinHasAnsweredImport } from './routes/promptparty/active/$pin/has-answered'
import { Route as PromptpartyActivePinFinishedImport } from './routes/promptparty/active/$pin/finished'
import { Route as PromptpartyActivePinAnswerImport } from './routes/promptparty/active/$pin/answer'
import { Route as LiftActivePinFingerImport } from './routes/lift/active/$pin/finger'

// Create/Update Routes

const ErrorRoute = ErrorImport.update({
  id: '/error',
  path: '/error',
  getParentRoute: () => rootRoute,
} as any)

const DebugRoute = DebugImport.update({
  id: '/debug',
  path: '/debug',
  getParentRoute: () => rootRoute,
} as any)

const VattenfallRouteRoute = VattenfallRouteImport.update({
  id: '/vattenfall',
  path: '/vattenfall',
  getParentRoute: () => rootRoute,
} as any)

const PromptpartyRouteRoute = PromptpartyRouteImport.update({
  id: '/promptparty',
  path: '/promptparty',
  getParentRoute: () => rootRoute,
} as any)

const LiftRouteRoute = LiftRouteImport.update({
  id: '/lift',
  path: '/lift',
  getParentRoute: () => rootRoute,
} as any)

const DrinkwheelRouteRoute = DrinkwheelRouteImport.update({
  id: '/drinkwheel',
  path: '/drinkwheel',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PromptpartySelectGameJoinTypeRoute =
  PromptpartySelectGameJoinTypeImport.update({
    id: '/select-game-join-type',
    path: '/select-game-join-type',
    getParentRoute: () => PromptpartyRouteRoute,
  } as any)

const PromptpartyJoinGameRoute = PromptpartyJoinGameImport.update({
  id: '/join-game',
  path: '/join-game',
  getParentRoute: () => PromptpartyRouteRoute,
} as any)

const PromptpartyHostGameRoute = PromptpartyHostGameImport.update({
  id: '/host-game',
  path: '/host-game',
  getParentRoute: () => PromptpartyRouteRoute,
} as any)

const LiftSelectGameJoinTypeRoute = LiftSelectGameJoinTypeImport.update({
  id: '/select-game-join-type',
  path: '/select-game-join-type',
  getParentRoute: () => LiftRouteRoute,
} as any)

const LiftJoinGameRoute = LiftJoinGameImport.update({
  id: '/join-game',
  path: '/join-game',
  getParentRoute: () => LiftRouteRoute,
} as any)

const LiftHostGameRoute = LiftHostGameImport.update({
  id: '/host-game',
  path: '/host-game',
  getParentRoute: () => LiftRouteRoute,
} as any)

const PromptpartyActiveLobbyRoute = PromptpartyActiveLobbyImport.update({
  id: '/active/lobby',
  path: '/active/lobby',
  getParentRoute: () => PromptpartyRouteRoute,
} as any)

const LiftActiveLobbyRoute = LiftActiveLobbyImport.update({
  id: '/active/lobby',
  path: '/active/lobby',
  getParentRoute: () => LiftRouteRoute,
} as any)

const PromptpartyActivePinShowRoute = PromptpartyActivePinShowImport.update({
  id: '/active/$pin/show',
  path: '/active/$pin/show',
  getParentRoute: () => PromptpartyRouteRoute,
} as any)

const PromptpartyActivePinHasAnsweredRoute =
  PromptpartyActivePinHasAnsweredImport.update({
    id: '/active/$pin/has-answered',
    path: '/active/$pin/has-answered',
    getParentRoute: () => PromptpartyRouteRoute,
  } as any)

const PromptpartyActivePinFinishedRoute =
  PromptpartyActivePinFinishedImport.update({
    id: '/active/$pin/finished',
    path: '/active/$pin/finished',
    getParentRoute: () => PromptpartyRouteRoute,
  } as any)

const PromptpartyActivePinAnswerRoute = PromptpartyActivePinAnswerImport.update(
  {
    id: '/active/$pin/answer',
    path: '/active/$pin/answer',
    getParentRoute: () => PromptpartyRouteRoute,
  } as any,
)

const LiftActivePinFingerRoute = LiftActivePinFingerImport.update({
  id: '/active/$pin/finger',
  path: '/active/$pin/finger',
  getParentRoute: () => LiftRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/drinkwheel': {
      id: '/drinkwheel'
      path: '/drinkwheel'
      fullPath: '/drinkwheel'
      preLoaderRoute: typeof DrinkwheelRouteImport
      parentRoute: typeof rootRoute
    }
    '/lift': {
      id: '/lift'
      path: '/lift'
      fullPath: '/lift'
      preLoaderRoute: typeof LiftRouteImport
      parentRoute: typeof rootRoute
    }
    '/promptparty': {
      id: '/promptparty'
      path: '/promptparty'
      fullPath: '/promptparty'
      preLoaderRoute: typeof PromptpartyRouteImport
      parentRoute: typeof rootRoute
    }
    '/vattenfall': {
      id: '/vattenfall'
      path: '/vattenfall'
      fullPath: '/vattenfall'
      preLoaderRoute: typeof VattenfallRouteImport
      parentRoute: typeof rootRoute
    }
    '/debug': {
      id: '/debug'
      path: '/debug'
      fullPath: '/debug'
      preLoaderRoute: typeof DebugImport
      parentRoute: typeof rootRoute
    }
    '/error': {
      id: '/error'
      path: '/error'
      fullPath: '/error'
      preLoaderRoute: typeof ErrorImport
      parentRoute: typeof rootRoute
    }
    '/lift/host-game': {
      id: '/lift/host-game'
      path: '/host-game'
      fullPath: '/lift/host-game'
      preLoaderRoute: typeof LiftHostGameImport
      parentRoute: typeof LiftRouteImport
    }
    '/lift/join-game': {
      id: '/lift/join-game'
      path: '/join-game'
      fullPath: '/lift/join-game'
      preLoaderRoute: typeof LiftJoinGameImport
      parentRoute: typeof LiftRouteImport
    }
    '/lift/select-game-join-type': {
      id: '/lift/select-game-join-type'
      path: '/select-game-join-type'
      fullPath: '/lift/select-game-join-type'
      preLoaderRoute: typeof LiftSelectGameJoinTypeImport
      parentRoute: typeof LiftRouteImport
    }
    '/promptparty/host-game': {
      id: '/promptparty/host-game'
      path: '/host-game'
      fullPath: '/promptparty/host-game'
      preLoaderRoute: typeof PromptpartyHostGameImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/promptparty/join-game': {
      id: '/promptparty/join-game'
      path: '/join-game'
      fullPath: '/promptparty/join-game'
      preLoaderRoute: typeof PromptpartyJoinGameImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/promptparty/select-game-join-type': {
      id: '/promptparty/select-game-join-type'
      path: '/select-game-join-type'
      fullPath: '/promptparty/select-game-join-type'
      preLoaderRoute: typeof PromptpartySelectGameJoinTypeImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/lift/active/lobby': {
      id: '/lift/active/lobby'
      path: '/active/lobby'
      fullPath: '/lift/active/lobby'
      preLoaderRoute: typeof LiftActiveLobbyImport
      parentRoute: typeof LiftRouteImport
    }
    '/promptparty/active/lobby': {
      id: '/promptparty/active/lobby'
      path: '/active/lobby'
      fullPath: '/promptparty/active/lobby'
      preLoaderRoute: typeof PromptpartyActiveLobbyImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/lift/active/$pin/finger': {
      id: '/lift/active/$pin/finger'
      path: '/active/$pin/finger'
      fullPath: '/lift/active/$pin/finger'
      preLoaderRoute: typeof LiftActivePinFingerImport
      parentRoute: typeof LiftRouteImport
    }
    '/promptparty/active/$pin/answer': {
      id: '/promptparty/active/$pin/answer'
      path: '/active/$pin/answer'
      fullPath: '/promptparty/active/$pin/answer'
      preLoaderRoute: typeof PromptpartyActivePinAnswerImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/promptparty/active/$pin/finished': {
      id: '/promptparty/active/$pin/finished'
      path: '/active/$pin/finished'
      fullPath: '/promptparty/active/$pin/finished'
      preLoaderRoute: typeof PromptpartyActivePinFinishedImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/promptparty/active/$pin/has-answered': {
      id: '/promptparty/active/$pin/has-answered'
      path: '/active/$pin/has-answered'
      fullPath: '/promptparty/active/$pin/has-answered'
      preLoaderRoute: typeof PromptpartyActivePinHasAnsweredImport
      parentRoute: typeof PromptpartyRouteImport
    }
    '/promptparty/active/$pin/show': {
      id: '/promptparty/active/$pin/show'
      path: '/active/$pin/show'
      fullPath: '/promptparty/active/$pin/show'
      preLoaderRoute: typeof PromptpartyActivePinShowImport
      parentRoute: typeof PromptpartyRouteImport
    }
  }
}

// Create and export the route tree

interface LiftRouteRouteChildren {
  LiftHostGameRoute: typeof LiftHostGameRoute
  LiftJoinGameRoute: typeof LiftJoinGameRoute
  LiftSelectGameJoinTypeRoute: typeof LiftSelectGameJoinTypeRoute
  LiftActiveLobbyRoute: typeof LiftActiveLobbyRoute
  LiftActivePinFingerRoute: typeof LiftActivePinFingerRoute
}

const LiftRouteRouteChildren: LiftRouteRouteChildren = {
  LiftHostGameRoute: LiftHostGameRoute,
  LiftJoinGameRoute: LiftJoinGameRoute,
  LiftSelectGameJoinTypeRoute: LiftSelectGameJoinTypeRoute,
  LiftActiveLobbyRoute: LiftActiveLobbyRoute,
  LiftActivePinFingerRoute: LiftActivePinFingerRoute,
}

const LiftRouteRouteWithChildren = LiftRouteRoute._addFileChildren(
  LiftRouteRouteChildren,
)

interface PromptpartyRouteRouteChildren {
  PromptpartyHostGameRoute: typeof PromptpartyHostGameRoute
  PromptpartyJoinGameRoute: typeof PromptpartyJoinGameRoute
  PromptpartySelectGameJoinTypeRoute: typeof PromptpartySelectGameJoinTypeRoute
  PromptpartyActiveLobbyRoute: typeof PromptpartyActiveLobbyRoute
  PromptpartyActivePinAnswerRoute: typeof PromptpartyActivePinAnswerRoute
  PromptpartyActivePinFinishedRoute: typeof PromptpartyActivePinFinishedRoute
  PromptpartyActivePinHasAnsweredRoute: typeof PromptpartyActivePinHasAnsweredRoute
  PromptpartyActivePinShowRoute: typeof PromptpartyActivePinShowRoute
}

const PromptpartyRouteRouteChildren: PromptpartyRouteRouteChildren = {
  PromptpartyHostGameRoute: PromptpartyHostGameRoute,
  PromptpartyJoinGameRoute: PromptpartyJoinGameRoute,
  PromptpartySelectGameJoinTypeRoute: PromptpartySelectGameJoinTypeRoute,
  PromptpartyActiveLobbyRoute: PromptpartyActiveLobbyRoute,
  PromptpartyActivePinAnswerRoute: PromptpartyActivePinAnswerRoute,
  PromptpartyActivePinFinishedRoute: PromptpartyActivePinFinishedRoute,
  PromptpartyActivePinHasAnsweredRoute: PromptpartyActivePinHasAnsweredRoute,
  PromptpartyActivePinShowRoute: PromptpartyActivePinShowRoute,
}

const PromptpartyRouteRouteWithChildren =
  PromptpartyRouteRoute._addFileChildren(PromptpartyRouteRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/drinkwheel': typeof DrinkwheelRouteRoute
  '/lift': typeof LiftRouteRouteWithChildren
  '/promptparty': typeof PromptpartyRouteRouteWithChildren
  '/vattenfall': typeof VattenfallRouteRoute
  '/debug': typeof DebugRoute
  '/error': typeof ErrorRoute
  '/lift/host-game': typeof LiftHostGameRoute
  '/lift/join-game': typeof LiftJoinGameRoute
  '/lift/select-game-join-type': typeof LiftSelectGameJoinTypeRoute
  '/promptparty/host-game': typeof PromptpartyHostGameRoute
  '/promptparty/join-game': typeof PromptpartyJoinGameRoute
  '/promptparty/select-game-join-type': typeof PromptpartySelectGameJoinTypeRoute
  '/lift/active/lobby': typeof LiftActiveLobbyRoute
  '/promptparty/active/lobby': typeof PromptpartyActiveLobbyRoute
  '/lift/active/$pin/finger': typeof LiftActivePinFingerRoute
  '/promptparty/active/$pin/answer': typeof PromptpartyActivePinAnswerRoute
  '/promptparty/active/$pin/finished': typeof PromptpartyActivePinFinishedRoute
  '/promptparty/active/$pin/has-answered': typeof PromptpartyActivePinHasAnsweredRoute
  '/promptparty/active/$pin/show': typeof PromptpartyActivePinShowRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/drinkwheel': typeof DrinkwheelRouteRoute
  '/lift': typeof LiftRouteRouteWithChildren
  '/promptparty': typeof PromptpartyRouteRouteWithChildren
  '/vattenfall': typeof VattenfallRouteRoute
  '/debug': typeof DebugRoute
  '/error': typeof ErrorRoute
  '/lift/host-game': typeof LiftHostGameRoute
  '/lift/join-game': typeof LiftJoinGameRoute
  '/lift/select-game-join-type': typeof LiftSelectGameJoinTypeRoute
  '/promptparty/host-game': typeof PromptpartyHostGameRoute
  '/promptparty/join-game': typeof PromptpartyJoinGameRoute
  '/promptparty/select-game-join-type': typeof PromptpartySelectGameJoinTypeRoute
  '/lift/active/lobby': typeof LiftActiveLobbyRoute
  '/promptparty/active/lobby': typeof PromptpartyActiveLobbyRoute
  '/lift/active/$pin/finger': typeof LiftActivePinFingerRoute
  '/promptparty/active/$pin/answer': typeof PromptpartyActivePinAnswerRoute
  '/promptparty/active/$pin/finished': typeof PromptpartyActivePinFinishedRoute
  '/promptparty/active/$pin/has-answered': typeof PromptpartyActivePinHasAnsweredRoute
  '/promptparty/active/$pin/show': typeof PromptpartyActivePinShowRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/drinkwheel': typeof DrinkwheelRouteRoute
  '/lift': typeof LiftRouteRouteWithChildren
  '/promptparty': typeof PromptpartyRouteRouteWithChildren
  '/vattenfall': typeof VattenfallRouteRoute
  '/debug': typeof DebugRoute
  '/error': typeof ErrorRoute
  '/lift/host-game': typeof LiftHostGameRoute
  '/lift/join-game': typeof LiftJoinGameRoute
  '/lift/select-game-join-type': typeof LiftSelectGameJoinTypeRoute
  '/promptparty/host-game': typeof PromptpartyHostGameRoute
  '/promptparty/join-game': typeof PromptpartyJoinGameRoute
  '/promptparty/select-game-join-type': typeof PromptpartySelectGameJoinTypeRoute
  '/lift/active/lobby': typeof LiftActiveLobbyRoute
  '/promptparty/active/lobby': typeof PromptpartyActiveLobbyRoute
  '/lift/active/$pin/finger': typeof LiftActivePinFingerRoute
  '/promptparty/active/$pin/answer': typeof PromptpartyActivePinAnswerRoute
  '/promptparty/active/$pin/finished': typeof PromptpartyActivePinFinishedRoute
  '/promptparty/active/$pin/has-answered': typeof PromptpartyActivePinHasAnsweredRoute
  '/promptparty/active/$pin/show': typeof PromptpartyActivePinShowRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/drinkwheel'
    | '/lift'
    | '/promptparty'
    | '/vattenfall'
    | '/debug'
    | '/error'
    | '/lift/host-game'
    | '/lift/join-game'
    | '/lift/select-game-join-type'
    | '/promptparty/host-game'
    | '/promptparty/join-game'
    | '/promptparty/select-game-join-type'
    | '/lift/active/lobby'
    | '/promptparty/active/lobby'
    | '/lift/active/$pin/finger'
    | '/promptparty/active/$pin/answer'
    | '/promptparty/active/$pin/finished'
    | '/promptparty/active/$pin/has-answered'
    | '/promptparty/active/$pin/show'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/drinkwheel'
    | '/lift'
    | '/promptparty'
    | '/vattenfall'
    | '/debug'
    | '/error'
    | '/lift/host-game'
    | '/lift/join-game'
    | '/lift/select-game-join-type'
    | '/promptparty/host-game'
    | '/promptparty/join-game'
    | '/promptparty/select-game-join-type'
    | '/lift/active/lobby'
    | '/promptparty/active/lobby'
    | '/lift/active/$pin/finger'
    | '/promptparty/active/$pin/answer'
    | '/promptparty/active/$pin/finished'
    | '/promptparty/active/$pin/has-answered'
    | '/promptparty/active/$pin/show'
  id:
    | '__root__'
    | '/'
    | '/drinkwheel'
    | '/lift'
    | '/promptparty'
    | '/vattenfall'
    | '/debug'
    | '/error'
    | '/lift/host-game'
    | '/lift/join-game'
    | '/lift/select-game-join-type'
    | '/promptparty/host-game'
    | '/promptparty/join-game'
    | '/promptparty/select-game-join-type'
    | '/lift/active/lobby'
    | '/promptparty/active/lobby'
    | '/lift/active/$pin/finger'
    | '/promptparty/active/$pin/answer'
    | '/promptparty/active/$pin/finished'
    | '/promptparty/active/$pin/has-answered'
    | '/promptparty/active/$pin/show'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DrinkwheelRouteRoute: typeof DrinkwheelRouteRoute
  LiftRouteRoute: typeof LiftRouteRouteWithChildren
  PromptpartyRouteRoute: typeof PromptpartyRouteRouteWithChildren
  VattenfallRouteRoute: typeof VattenfallRouteRoute
  DebugRoute: typeof DebugRoute
  ErrorRoute: typeof ErrorRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DrinkwheelRouteRoute: DrinkwheelRouteRoute,
  LiftRouteRoute: LiftRouteRouteWithChildren,
  PromptpartyRouteRoute: PromptpartyRouteRouteWithChildren,
  VattenfallRouteRoute: VattenfallRouteRoute,
  DebugRoute: DebugRoute,
  ErrorRoute: ErrorRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/drinkwheel",
        "/lift",
        "/promptparty",
        "/vattenfall",
        "/debug",
        "/error"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/drinkwheel": {
      "filePath": "drinkwheel/route.tsx"
    },
    "/lift": {
      "filePath": "lift/route.tsx",
      "children": [
        "/lift/host-game",
        "/lift/join-game",
        "/lift/select-game-join-type",
        "/lift/active/lobby",
        "/lift/active/$pin/finger"
      ]
    },
    "/promptparty": {
      "filePath": "promptparty/route.tsx",
      "children": [
        "/promptparty/host-game",
        "/promptparty/join-game",
        "/promptparty/select-game-join-type",
        "/promptparty/active/lobby",
        "/promptparty/active/$pin/answer",
        "/promptparty/active/$pin/finished",
        "/promptparty/active/$pin/has-answered",
        "/promptparty/active/$pin/show"
      ]
    },
    "/vattenfall": {
      "filePath": "vattenfall/route.tsx"
    },
    "/debug": {
      "filePath": "debug.tsx"
    },
    "/error": {
      "filePath": "error.tsx"
    },
    "/lift/host-game": {
      "filePath": "lift/host-game.tsx",
      "parent": "/lift"
    },
    "/lift/join-game": {
      "filePath": "lift/join-game.tsx",
      "parent": "/lift"
    },
    "/lift/select-game-join-type": {
      "filePath": "lift/select-game-join-type.tsx",
      "parent": "/lift"
    },
    "/promptparty/host-game": {
      "filePath": "promptparty/host-game.tsx",
      "parent": "/promptparty"
    },
    "/promptparty/join-game": {
      "filePath": "promptparty/join-game.tsx",
      "parent": "/promptparty"
    },
    "/promptparty/select-game-join-type": {
      "filePath": "promptparty/select-game-join-type.tsx",
      "parent": "/promptparty"
    },
    "/lift/active/lobby": {
      "filePath": "lift/active/lobby.tsx",
      "parent": "/lift"
    },
    "/promptparty/active/lobby": {
      "filePath": "promptparty/active/lobby.tsx",
      "parent": "/promptparty"
    },
    "/lift/active/$pin/finger": {
      "filePath": "lift/active/$pin/finger.tsx",
      "parent": "/lift"
    },
    "/promptparty/active/$pin/answer": {
      "filePath": "promptparty/active/$pin/answer.tsx",
      "parent": "/promptparty"
    },
    "/promptparty/active/$pin/finished": {
      "filePath": "promptparty/active/$pin/finished.tsx",
      "parent": "/promptparty"
    },
    "/promptparty/active/$pin/has-answered": {
      "filePath": "promptparty/active/$pin/has-answered.tsx",
      "parent": "/promptparty"
    },
    "/promptparty/active/$pin/show": {
      "filePath": "promptparty/active/$pin/show.tsx",
      "parent": "/promptparty"
    }
  }
}
ROUTE_MANIFEST_END */
