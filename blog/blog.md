---
title: Pure UI using Xstate and ReactJS
published: false
description: We're gonna go over what state machines are and how a statechart, which is like "state machine 2.0", can help you build more robust applications.
tags: #reactjs, #xstate, #statechart, #javascript
---

We're gonna go over what state machines are and how a statechart, which is like "state machine 2.0", can help you build more robust applications.

We'll be using `xstate`, which is a `statechart` library and reactJS. But you could be replace `reactJS` with any other framework really.

The overall goal is to reduce cognitive load when developing your UI, by having your UI be a function of state.

| current state |                UI                |
| ------------- | :------------------------------: |
| list          |            show list             |
| list.loading  | show specific list loading image |
| noResults     |     show no results message      |

### A State Machine?

The term state machine has always felt a bit weird to me.
It might be easier to initially see it as:

> A function that does things that are related ONLY to the _current state_ of the app with the given input.

```js
const currentState = "isLoading";
function machine(input) {
  if (currentState === "isLoading") {
    // *only* do things related to `isLoading` state with `input`
  }

  if (currentState === "isError") {
    // *only* do things related to `isError` state with `input`
  }
}
```

Here's a familiar state machine:

```js
// currentState is `idle`

fetch() // currentState is `fetching`
.then(
  (successResults) => {
    //  currentState is 'success'
    // stateful data is 'successResults'
  }
  (errorMsg) => {
    // currentState is 'error'
    // stateful data is 'errorMsg'
  }
);
```

Since,`currentState` can only be **one thing** at a time, you don't run into these checks:

```js
 // NOPE, NOPE, NOPE
if (isLoading && !isError) // ...
if (!isLoading && isError) // ...
if (isLoading && isError) // ...
```

### Two types of state

There are two types of state:

1. Current State of your app. These answer questions like:

- "is it loading?"
- "is there an error?"
- "are we fetching user data?"

The answers here will determine which **component** is used:

```jsx
if (currentState === "error") {
  return <Error />;
}
```

2. Stateful data. This is called `context` in `xState`.
   These answer questions like:

- "what is the error message?"
- "what are the results from the API request?"
- "which filter/option is currently selected?"

The answers here will determine which **props** a component has:

```jsx
if (currentState === 'error') {
  return <Error msg={context.errorMsg}>
}
```

### Tell me which state we're in and I'll tell you what the UI looks like

The UI should be a function of the state.
This is different from having the UI be a function of the data we currently have.

:thumbsup: Function of state:

```js
if (currentState === list.noResults) {
  return "No Results found";
}

if (currentState === list.isError) {
  return "Oops!";
}
```

#### vs.

:thumbsdown: Data that we currently have:

```js
if (list.length === 0) {
  // the list is empty, so we probably don't have any results"
  return "No Results found";
}

if (list.errMsg) {
  // list.err is not empty, show an error message #yolo
  return "Oops";
}
```

##### :point_up: This is an important distinction. :point_up:

The conversation here shifts from:

> "What do we do if we have zero results ?"
> Remember:
> We could have zero results because of an error, we haven't fetched anything yet, or we really don't have any results. Each one of these is a **different** state.

To:

> "What does the UI look like **when** we're in a `error`, `initial` or `noResults` state?"

You're now building your UI to account for each state.

> Does the title change?
> Do the icons change?
> Does something become disabled?
> Should there be a try again button?

### State Chart Configuration

A State Chart is a state machine that can contain other state machines... and more!

At the base of all of this is the configuration for your statechart.

You declare:

- the possible states that can exist `loading, error, noResults, listing, details, etc..`
- the `actions/events` that can happen within **each** state:
  `action/TRY_AGAIN` => can only happen if we're in the `listing.error` state
- the `conditionals/guards`, needed to pass before moving on to a different state e.g:
  We will only move to the `noResults` state if we
  have a success response and `total === 0`

It's cool to configure a state machine where the vast majority of your UI logic can be understood from it.

Try to understand the config below before seeing the explanation of it:

```js
// guards.js - conditional functions used to determine what the next step in the flow is
const guards = {
  shouldCreateNewTicket: (ctx, { data }) => data.value === "new_ticket",
  shouldFindTicket: (ctx, { data }) => data.value === "find_ticket"
};

// actions.js - functions that perform an action like updating the stateful data in the app
const actions = {
  askIntroQuestion: ctx => {
    return {
      ...ctx,
      chat: ["How may I help you?"]
    };
  }
};

// constants/state.js constants to represent the current state of the app
const intro = "@state/INTRO";
const question = "@state/QUESTION";
const newTicket = "@state/NEW_TICKET";
const findTicket = "@state/FIND_TICKET";

// constants/actions.js: constants to represent actions to be taken
const ANSWER = "@state/ANSWER";

const config = Machine({
  initial: intro,
  states: {
    [intro]: {
      initial: question,
      on: {
        [ANSWER]: [
          {
            cond: "shouldCreateNewTicket",
            actions: "updateCtxWithAnswer",
            target: newTicket
          },
          {
            cond: "shouldFindTicket",
            actions: "updateCtxWithAnswer",
            target: findTicket
          }
        ]
      },
      states: {
        [question]: { onEntry: "askIntroQuestion" }
      }
    },
    [newTicket]: {},
    [findTicket]: {}
  }
}).withConfig({
  actions,
  guards
});
```

![image](https://media.giphy.com/media/xUPGcJRMK0NxGNEkKY/giphy.gif)

#### The snippet above reads as:

- initial state is `intro` from _states.intro_
  - the initial state inside of `intro` is _question_
  - `onEntry` of `intro.question` we'll trigger action `askIntroQuestion`
    - _nothing happens here... the UI is idle... now we wait_
    - on an `ANSWER` event:
      - if `shouldCreateNewTicket`
        - `updateCtxWithAnswer`
        - go to `newTicket` state
      - if `shouldFindTicket`
        - `updateCtxWithAnswer`
        - go to `findTicket` state

#### And can be visualized at https://statecharts.github.io/xstate-viz/

![image](https://thepracticaldev.s3.amazonaws.com/i/3h1cvpqtpeztlukabuia.jpg)

YO! This visualization is built from the actual code!

I :heart: THIS!

These aren't code comments or a `spec-32.pdf` on the shared hard drive that hasn't been updated in 8 months.

Imagine how much this helps drive conversations about the product flow and how it aligns stakeholders around what each state of the app is.

It becomes clear if there is an `error` state,  
or if there should be a `noResults` vs. an `error` state

## Okay... Let's build a chatbot flow

![image](https://thepracticaldev.s3.amazonaws.com/i/miqglabh6eg9s8j4y5g2.gif)

Here's the spec and flow... boring I know... but stay with me here.

### SPEC:

As a user I want to be able to:

1.  Create a new ticket to order something
2.  Find an existing ticket
3.  There should be `loading` states and `error` states if applicable

`Create new ticket`

- when ordering an item:
  - if we don't have that item in stock:
    - show a warning message
    - show item options with the out of stock item greyed out
    - user should be able to select from options again
  - if we have the item in stock:
    - show success message
  - if there's an error
    - show error message

`Find ticket`

- if found:

  - display what was ordered
  - ask the user if they would like to send a "ping" to that order

- if not found:
  - display a warning msg
  - ask the user if they would like to create a new ticket

Here's a bit of the machine config:

```js
const flowMachine = Machine({
  initial: intro,
  states: {
    [intro]: {
      initial: question,
      on: {
        [ANSWER]: [
          {
            target: newTicket,
            cond: "shouldCreateNewTicket",
            actions: "updateCtxWithAnswer"
          },
          {
            target: findTicket,
            cond: "shouldFindTicket",
            actions: "updateCtxWithAnswer"
          }
        ]
      },
      states: {
        [question]: { onEntry: "askIntroQuestion" }
      }
    },

    [findTicket]: {
      initial: question,
      on: {
        [ANSWER]: { target: `.${pending}`, actions: 'updateCtxWithAnswer' }
      },
      states: {
        [question]: { onEntry: 'askFindTicket' },
        [error]: {},
        [noResults]: {},
        [pending]: {
          invoke: {
            src: 'getTicket',
            onDone: [
              {
                target: done,
                actions: 'updateCtxWithResults',
                cond: 'foundTicket'
              },
              { target: noResults }
            ],
            onError: error
          }
        },
        [done]: { type: 'final' }
      },
      onDone: pingTicket
  }
});
```

- in `findTicket`:
- Once the user answers the question, we'll move onto the `pending` state where we'll invoke a `promise` called `getTicket`
- if there is an error:
  - we move to the `error` state
- else
  - if `foundTicket` is true, we move to the `done` state
  - if `foundTicket` is false, we move to the `noResults` state

### Here's one way to render component per state

Rendering a component based on the current state is great.

Here's one of the many ways you could choose to render a component
or pass different props based on the `currentState` of the app.
Again:
`currentState` here refers to the app state "isLoading, error, etc."
`currentState.context` refers to the stateful data that currently have

```jsx
/**
 * Array of
 * [].<StateName, function>
 *
 * NOTE: specificity matters here so a more specific state
 * should be first in the list. e.g:
 * 'findTicket.noResults'
 * 'findTicket'
 *
 * On state 'findTicket.foo', 'findTicket' will be matched
 */
const stateRenderers = [
  [newTicket, ({ onSelect, currentState }) =>
    <Choices
      options={currentState.context.options}
      onSelect={onSelect} />
  ],

  [`${findTicket}.${noResults}`, () =>
    <Msg>Sorry, we can't find your ticket</Msg>],

  [`${findTicket}.${error}`, () => <Mgs>Oops, we ran into an error!</Msg>],

  [findTicket, ({ onSelect }) => <FindTicketForm onSelect={onSelect} />]
];

// components/Choices.jsx
const Choices = ({ currentState, ...props}) => (
  // based on current state, get a function from `stateRenders`
  // and render it with the props we have
  const [stateName, renderState] =
      stateRenderers.find(([key]) => currentState.matches(key));

  return renderState(props);
)
```

### And here's...

![!image](https://media.giphy.com/media/5OWLUbuMq4YXEl2ECg/giphy.gif)

Here's a different setup to display components based on current
app state.

Something to note here. `currentState` is only one thing
at a time, so you're not doing boolean checks here of
`isLoading` vs. `error`

```jsx
<ChatBody data-testid="ChatBody">
  // display any chat info that exists in context
  {currentState.context.chat.map(({ question, answer }) => (
    <React.Fragment key={`${question}.${answer}`}>
      <ChatMsgQuestion>{question}</ChatMsgQuestion>
      {answer && <ChatMsgAnswer>{answer}</ChatMsgAnswer>}
    </React.Fragment>
  ))}
  // display message based on the current state that we're in // NOTE: only one
  of this is possible at a time
  {currentState.matches(pending) && <ChatMsgLoading />}
  {currentState.matches(error) && <ChatMsgError />}
  {currentState.matches(noResults) && (
    <ChatMsgWarning>{getNoResultsMsg(currentState)}</ChatMsgWarning>
  )}
  {currentState.matches(itemOrdered) && (
    <ChatMsgSuccess>{getSuccessMsg(currentState)}</ChatMsgSuccess>
  )}
</ChatBody>
```

### Takeaways

Alright... hopefully you've made it this far.
Check out the code for some more stuff.

I think this builds nicely on top of the `redux` patterns that have been working out like message passing, one flow direction, separation of data management from components.

I've found it surprisingly easy to adjust to requirement changes using this pattern.

It has gone something like this:

1. spec changes
2. adjust state machine config first
3. reflect the new state in the UI

> "okay, we just need to get to this new state. Once we're in that state, we just need to make the UI reflect what that specific state should like"

### Opinions

1. Does this replace redux?
   Yup. But the redux patterns are still applicable.

- Have a place that reduces your data based on an event
- Data flows one way
- separate APIs

2. What about prop-drilling?

- I think the issue is overblown.
- You could break out your components a bit better or use react.context

### Recommended reading

https://xstate.js.org
https://statecharts.github.io
