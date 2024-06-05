# Real-Time Message Board

This project is a real-time message board application that demonstrates full CRUD operations with real-time updates using GraphQL subscriptions. It consists of a Node.js server using Apollo Server and a React client with TypeScript and Vite.

## Features
- **Create, Read, Update, Delete (CRUD)**: Perform all CRUD operations on messages.
- **Real-Time Updates**: Leverages GraphQL subscriptions to update the UI in real-time when messages are added, updated, or deleted.
- **Modular Structure**: The project is organized into separate server and client directories for better manageability.

## Technologies Used
- **Server**: Node.js, Apollo Server, GraphQL, WebSockets, Express
- **Client**: React, TypeScript, Apollo Client, Vite
- **Real-Time**: Subscriptions using `subscriptions-transport-ws`

## Setup and Running

### Server

1. **Navigate to the server directory**:
   ```bash
   cd server
2. **Install dependencies**:

    ```bash
    npm install
    ```
3. **Build the server**:

    ```bash
    npm run build
    ```
4. **Start the server**:

    ```bash
    npm start
    ```
The server will be running on http://localhost:4000/graphql.

### Client
1. **Navigate to the client directory:
   ```bash
   cd client
```
2. **Install dependencies**

  ```bash
  npm install
  ```

3. Start the client:

  ``` bash
  npm run dev
  The client will be running on http://localhost:5173.
  ```

 ## Testing
### GraphQL Playground
You can use the GraphQL playground to test your queries, mutations, and subscriptions by navigating to http://localhost:4000/graphql in your browser.
## Example Queries and Mutations

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

## Steps to Test
1. Open GraphQL Playground:
Navigate to http://localhost:4000/graphql in your browser to open the GraphQL playground.

2. Run Queries:
Copy the query you want to test and paste it into the left panel of the playground. Click the play button to run the query and see the results.

3. Run Mutations:
Similar to queries, copy the mutation you want to test, paste it into the left panel, and click the play button to run the mutation and see the results.

4. Run Subscriptions:
For subscriptions, open a new tab in the playground (using the plus button at the top). Paste the subscription you want to test into the left panel and click the play button. The subscription will stay open and listen for real-time updates. You can open another tab to run a mutation that triggers the subscription and see the results in real-time.
## Example workflow

### Add a New Message:
Run the AddMessage mutation to add a new message.

### Fetch All Messages:
Run the GetMessages query to fetch the list of all messages, including the newly added one.

### Update a Message:
Run the UpdateMessage mutation to update the content of an existing message.

### Subscribe to Additions:
Open a subscription tab and run the OnMessageAdded subscription. Then, run the AddMessage mutation in another tab to see the subscription pick up the new message in real-time.

### Summary

This provides a comprehensive guide for setting up, running, and testing both the server and client sides of your real-time message board application. It includes detailed instructions on how to install dependencies, start the development servers, and perform CRUD operations with real-time updates.
