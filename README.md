# Get started

1. `cd functions`
2. `npm i`
3. `npm run serve`

## Current status

Configurations to allow this these functions to run on remote enviornment are not set. For now it is only configured to work locally on your machine with emulators running.

There is still a lot left to finish, this is basically a POC.

## Functions

There are two functions that support the features specified by the brief:
`getUserInfo` and `updateUserInfo`.

#### getUserInfo

`getUserInfo` queries firestore for user data `name` and `email` and the key is `phone`.

#### updateUserInfo

`updateUserInfo` stores data sent from the web client
