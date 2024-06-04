# Real-Time Message Board Client

This project is the client side of a real-time message board application that demonstrates full CRUD operations with real-time updates using GraphQL subscriptions. It is built with React, TypeScript, and Vite.

## Features
- **Create, Read, Update, Delete (CRUD)**: Perform all CRUD operations on messages.
- **Real-Time Updates**: Leverages GraphQL subscriptions to update the UI in real-time when messages are added, updated, or deleted.
- **Modular Structure**: The client is organized to be easily maintainable and extendable.

## Technologies Used
- **Client**: React, TypeScript, Apollo Client, Vite
- **Real-Time**: Subscriptions using `subscriptions-transport-ws`

## Setup and Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhimax/react-ts-graphql-real-time-message-board.git
   cd real-time-message-board/client

2. **Install dependencies**

  ```bash
  npm install
  ```

3. Start the client:

  ``` bash
  npm run dev
  The client will be running on http://localhost:5173.
  ```

## Structure
The main files and their purposes are as follows:

- src/apolloClient.ts: Configures Apollo Client with HTTP and WebSocket links.
- src/App.tsx: Main application component that includes the Apollo Provider and renders the Messages component.
- src/Messages.tsx: Handles displaying, adding, updating, and deleting messages, as well as subscriptions for real-time updates.

## Testing
You can test the application by performing the following actions:

- Add a New Message: Enter a message in the input field and click "Add Message". The message list will update in real-time.
- Update a Message: Click "Update" next to a message. Enter new content in the prompt and confirm. The message content will update in real-time.
- Delete a Message: Click "Delete" next to a message. The message will be removed from the list in real-time.
- Subscriptions: Open multiple browser tabs to see real-time updates across different sessions.

## Example Queries and Mutations
Here are some example queries and mutations you can use in the GraphQL playground at http://localhost:4000/graphql to interact with the server:

## Queries
- Fetch All Messages:
```bash
    query GetMessages {
    messages {
        id
        content
        }
    }
```
- Fetch a Specific Message by ID:
```bash
    query GetMessage {
  message(id: "1") {
    id
    content
  }
}
```
## Mutations
- Add a New Message:
```bash
mutation AddMessage {
  addMessage(content: "Hello, world!") {
    id
    content
  }
}
```
- Update an Existing Message:
```bash
mutation UpdateMessage {
  updateMessage(id: "1", content: "Updated content") {
    id
    content
  }
}
```
- Delete a Message:
```bash
mutation DeleteMessage {
  deleteMessage(id: "1") {
    id
    content
  }
}
```
## Subscriptions
- Subscribe to Message Additions:
```bash
subscription OnMessageAdded {
  messageAdded {
    id
    content
  }
}
```
- Subscribe to Message Updates:
```bash
subscription OnMessageUpdated {
  messageUpdated {
    id
    content
  }
}

```
- Subscribe to Message Deletions:
```bash
subscription OnMessageDeleted {
  messageDeleted {
    id
    content
  }
}
```

### Summary

This `README.md` provides a comprehensive guide for setting up, running, and testing the client side of your real-time message board application. It includes detailed instructions on how to install dependencies, start the development server, and perform CRUD operations with real-time updates.