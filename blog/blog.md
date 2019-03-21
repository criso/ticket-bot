TOC

### Intro

xstate is a `statechart` library.
Statecharts are an extenstion of state machines that work better in real world applications.

### Two types of state

There are two types of state.

1. State of your app. These answer questions like:

- "is it loading?"
- "is there an error?"
- "are we waiting for user input?"
- "are we fetching user data?"

2. Stateful data, called `context` in `xState`. These answer questions like:

- "what is the error message?"
- "what are the results from the api request?"
- "which filter/option is currently selected?"

### Machine?

- the term machine from state machine always felt a bit abstract to me.
  Might be easier to see it as:

A function that does things based on input **AND** the current state of your app.

```js
const appState = "isLoading";
function machine(input) {
  if (appState === "isLoading") {
    // do loading things
  }
  if (appState === "isError") {
    // do errror things
  }
}
```

The biggest thing to note here is that `appState` can only be **one thing** at a time.
So, you don't run into this:

```js
if (isLoading && !isError) // NOPE, NOPE, NOPE
```

Here's a familiar state machine:

```js
// state is `idle`
fetch() // state is `fetching`
.then(
  (successResults) => { /* state is 'success' */ }
  (errorMsg) => { /* state is 'error' */}
);

// NOTE: state here is different than the data that is returned
```

### Tell me which state we're in and I'll tell you what the UI looks like

UI should be a function of state.
This is different than UI being a function of what data do we have.

This means that in:
`State: isLoading` -> UI displays a 'Loading message'
`State: noResults` -> UI displays a 'Loading a no results message'
`State: isError` -> UI displays a 'Loading an error message'

`State: list.success`:
UI displays a list using results from `state.context.items`.
This seems a like plain ol' regular way of doing things but here are where things get interesting.

On this state, `context` is expected to have something:

```js
{
  items: ['foo', 'bar', ...]
  total: 20
}
```

Your UI is displaying a `list.success` state.
You shouldn't be checking if `total is zero` because when `total is zero` you're
in a `noResults` state.

This is an important distinction.
The conversation here shifts from:

> "What do we do if we have zero results ?"

To:

> "What does the UI look like **WHEN** we're in a `noResults` state?"

You're now building your ui to account for that state everywhere.
Does the title change? Do the icons change? Does something become disabled? Should there be a try again button?

### Machine Configuration

You configure a machine to a point where the vast majority of your UI logic
can be understood from it.

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

#### The snippet above reads as:

- initial state is `intro` from `states.intro`
  - the initial state inside of `intro` is `question`
  - `onEntry` of `intro.question` we'll `askIntroQuestion`
    - _nothing happens here... now we wait_
    - on `ANSWER` (we receive an ANSWER msg/event/action...whatever you wanna call it):
      - if `shouldCreateNewTicket`
        - `updateCtxWithAnswer` and move on to the `newTicket` state
      - if `shouldFindTicket`
        - `updateCtxWithAnswer` and move on to the `findTicket` state

#### And can be visualized at https://statecharts.github.io/xstate-viz/

![image](chart-viz-1.jpg)

The great thing about this visualization is that it's built from the actual code.
This isn't code comments or a spec.pdf on the shared hard drive that hasn't been updated in 8 months.

This is legit.

This drives conversations and can align stakeholders around what each state of the app is.
It becomes clear if there is an `error` state. Or if there should be a `noResults` vs. an `error` state

### Render component per state

```js
const stateRenderers = [
  [newTicket, ({ onSelect, currentState }) =>
    <Choices
      options={currentState.context.options}
      onSelect={onSelect} />
  ],

  [`${findTicket}.${noResults}`, () =>
    <Msg>Sorry, we can't find your ticket</Msg>],

  [`${findTicket}.${error}`, () => <Mgs>Ooops, we ran into an error!</Msg>],

  [findTicket, ({ onSelect }) => <FindTicketForm onSelect={onSelect} />]
];

// components/Choices.jsx
const Choices = ({ currentState, ...props}) => (
  const [stateName, renderState] =
      stateRenderers.find(([key]) => currentState.matches(key));

  return renderState(props);
)
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
----
```
Spec:
As a user I wan to be able to:

- create a new ticket to order something
- find an existing ticket

[Create new ticket flow]

- when ordering an item, if there is no more in stock, offer the user a chance
  to order something else

[Find ticket]

- if found, ask the user if they would like to send a "ping" to that order

### [intro]

- show chat message `How may I help you today`
- show options => `[Create new Ticket] [Inquire Existing Ticket]`

### [Create Ticket]

- show chat message `what would you like to order?`
- show new ticket options => `[monitor] [laptop] [mouse]`

  - on Ticket option selection:

    - request item selected from api

      - if `Loading`:

        - show loading chat mesage

      - on `Error`:

        - show an error message

      - on `Success`:

        - if we don't have that item in stock:

          - show a warning message
          - show item options with the out of stock item grayed out
          - user should be able to select from options again

        - if we have the item in stock:
          - show success message

### [Find Exisiting Ticket]

- show chat message `Please enter ticket number`
- show select box with possible ticket numbers

  - on Ticket option selection:

    - request ticket selected from api

      - if `Loading`:

        - show loading chat mesage

      - on `Error`:

        - show an error message

      - on `Success`:
        - if we have the ticket:
          - display what was ordered
        - if we don't have the ticket:
          - display warning message
          - show button to create new ticket
            - on create new ticket goto `[Create Ticket]` flow

```

```
