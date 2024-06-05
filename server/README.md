# Real-Time Message Board Server

This project is the server side of a real-time message board application that demonstrates full CRUD operations with real-time updates using GraphQL subscriptions. It is built with Node.js, Apollo Server, and Express.

## Features
- **Create, Read, Update, Delete (CRUD)**: Perform all CRUD operations on messages.
- **Real-Time Updates**: Leverages GraphQL subscriptions to update the UI in real-time when messages are added, updated, or deleted.
- **Modular Structure**: The server is organized to be easily maintainable and extendable.

## Technologies Used
- **Server**: Node.js, Apollo Server, GraphQL, WebSockets, Express
- **Real-Time**: Subscriptions using `subscriptions-transport-ws`

## Setup and Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhimax/react-ts-graphql-real-time-message-board.git
   cd real-time-message-board/server
   ```
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

## Testing with GraphQL Playground
Open the GraphQL playground by navigating to http://localhost:4000/graphql in your browser. You can use the playground to test queries, mutations, and subscriptions.

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
