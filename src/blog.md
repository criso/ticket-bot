- xstate is a `statechart` library.
  Statecharts are an extenstion of state machines that work better in real world applications.

- find a restaurant chat bot

Lets build a chat flow to show a restaurant.
We'll be asking some questions and then asking other questions based on answers.

1. what type of food are you looking for?

- show options (select box)
- onAnswer
  - ask if the user will be driving

2. will you be driving?

- show options (car icon, no)
- onAnswer
  - if _yes_
    - show the restaurant listing
  - if _no_
    - ask if the user would like to rent a scooter

3. would you like to rent a scooter?

- show options (scooter icon, no)
- onAnswer
  - if _yes_
    - show the restaurant listing **AND** a scooter coupon
  - if _no_
    - show the restaurant listing

```js
const typeOfFood = '@state/TYPE_OF_FOOD';
const scooterRental = '@state/SCOOTER_RENTAL';
const typeOfListing = '@state/TYPE_OF_LISTING';
const withScooter = '@state/LISTING_WITH_SCOOTER';
const regular = '@state/REGULAR_LISTING';
const question = '@state/QUESTION';
const shouldSkip = '@state/SHOULD_SKIP';
const done = '@state/DONE';
const resturantListing = '@state/RESTARAUNT_LISTING';

const ANSWER = '@action/ANSWER';
const SKIP = '@action/SKIP';

const machineConfig = {
  initial: typeOfFood,
  states: {
    [typeOfFood]: {
      initial: question,
      on: {
        [ANSWER]: {
          target: `.${pending}`,
          actions: 'updateCtxWithAnswer'
        }
      },
      states: {
        [question]: {
          onEntry: 'askTypeOfFood'
        },
        [pending]: {
          invoke: 'getFoodMenu',
          onDone: [
            {
              target: noResults,
              cond: 'hasNoResults'
            },
            {
              target: done,
              actions: 'updateCtxWithResults'
            }
          ],
          onError: noResults
        },
        [done]: {
          type: 'final'
        },
        onDone: driving
      }
    },

    [driving]: {
      initial: question,
      on: {
        [ANSWER]: {
          target: done
          actions: 'updateCtxWithAnswer'
        }
      },
      states: {
        [question]: {
          onEntry: 'askIsDriving'
        },
        [done]: {
          type: 'final'
        }
      },
      onDone: scooterRental
    },

    [scooterRental]: {
      initial: shouldSkip,
      on: {
        [ANSWER]: {
          target: done,
          actions: 'updateCtxWithAnswer'
        },
        [SKIP]: { target: done }
      },
      states: {
        [shouldSkip]: {
          on: {
            '': [
              {
                target: question,
                cond:'shouldAskRentScooter'
              },
              { target: done }
            ]
          }
        },
        [question]: {
          onEntry: 'askRentScooter'
        },
        [done]: {
          type: 'final'
        }
      }
      onDone: restaurantListing
    },

    [restaurantListing]: {
      initial: typeOfListing,
      states: {
        [typeOfListing]: {
          on: {
            '': [
              {
                target: withSooter,
                cond:'isWithScooterListing'
              },
              { target: regular }
            ]
          }
        },
        [withScooter]: {},
        [regular]: {}
    }
  }
}

```

Onboarding

is this your first time:
[yes]
sign up

[no]
login

How may I help you?
[create new ticket]
onSubmit - ticket has been submitted, display info

[inquire old ticket] - ask ticket info - on found ticket - show ticket info and show text area to submit new info - on submit, display ticket info

- did not find ticket, would you like to creat a new ticket? - [if yes]
  go to create ticket

- how may I help you today?

  - if create new ticket:

    - what would you like to order?
      [monitor][laptop] [mouse]
      - if we have that item go to success
      - if we don't have that item show `foo`
      - if there's an error show an error

  - existing ticket:

Spec:
As a user I wan to be able to create a new ticket to order something or inquire about an existing ticket




### [intro]
  - show chat message `How may I help you today`
  - show options =>  `[Create new Ticket] [Inquire Existing Ticket]`


### [Create Ticket]
  - show chat message `what would you like to order?`
  - show new ticket options => `[monitor] [laptop] [mouse]`
    - on Ticket option selection:
      - request item selected from api
        * if `Loading`:
          - show loading chat mesage

        * on `Error`:
          - show an error message

        * on `Success`:
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
        * if `Loading`:
          - show loading chat mesage

        * on `Error`:
          - show an error message

        * on `Success`:
          - if we have the ticket:
            - display what was ordered
          - if we don't have the ticket:
            - display warning message 
            - show button to create new ticket
              - on create new ticket goto `[Create Ticket]` flow
