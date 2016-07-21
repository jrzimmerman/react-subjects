////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import sortBy from 'sort-by'


require('./styles')

/*
Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a auth.github object
})

sendMessage(
  auth.uid,                       // the auth.uid string
  auth.github.username,           // the username
  auth.github.profileImageURL,    // the user's profile image
  'hello, this is a message'      // the text of the message
)

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

const PinToBottom = React.createClass({
  componentWillUpdate() {
    const buffer = 10
    const node = findDOMNode(this)
    const { scrollHeight, scrollTop, clientHeight } = node
    this.isAtBottom = clientHeight + scrollTop + buffer >= scrollHeight
  },

  componentDidUpdate() {
    if(this.isAtBottom) {
      const node = findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }

  },
  render() {
    return this.props.children
  }
})


const Message = React.createClass({
  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render() {
    const { message } = this.props
    return (
      <li className="message">{message.text}</li>
    )
  }
})

const MessageGroups = React.createClass({
  propTypes: {
    messageGroups: React.PropTypes.array.isRequired
  },

  render() {
    const { messageGroups } = this.props
    const renderedMessages = messageGroups.map((group, index) => (
      <ol key={index} className="message-groups">
        <li className="message-group">
          <div className="message-group-avatar">
            <img src={group[0].avatarURL}/>
          </div>
          <ol className="messages">
            {group.map((message) => (
              <Message key={message._key} message={message}/>
            ))}
          </ol>
        </li>
      </ol>
    ))
    return (
      <PinToBottom>
        <div className="messages">
          { renderedMessages }
        </div>
      </PinToBottom>
    )
  }
})

const MessageForm = React.createClass({
  propTypes: {
    auth: React.PropTypes.object
  },

  submitMessage(event) {
    event.preventDefault()
    const { auth } = this.props
    sendMessage(
      auth.uid,                       // the auth.uid string
      auth.github.username,           // the username
      auth.github.profileImageURL,    // the user's profile image
      this.refs.message.value          // the text of the message
    )
    this.refs.message.value = ''
  },

  render() {
    const { auth } = this.props
    return (
      <form className="new-message-form" onSubmit={this.submitMessage}>
        <div className="new-message">
          <input
            ref="message"
            type="text"
            placeholder="say something..."
          />
        </div>
      </form>
    )
  }
})

const Chat = React.createClass({

  getInitialState() {
    return {
      auth: null,
      messages: []
    }
  },

  componentDidMount() {
    login((err, auth) => {
      this.setState({ auth })
      subscribeToMessages((messages) => {
        this.setState({ messages })
      })
    })
  },

  groupMessages(messages) {
    const sortedMessages = messages
      .filter(m => (/\S/).test(m.text)) // Only keep non-empty messages
      .sort(sortBy('timestamp')) // Sort by timestamp

    // Group subsequent messages from the same sender.
    const messageGroups = []

    let lastMessage, currentMessageGroup
    sortedMessages.forEach(message => {
      if (lastMessage && lastMessage.uid === message.uid) {
        currentMessageGroup.push(message)
      } else {
        if (currentMessageGroup)
          messageGroups.push(currentMessageGroup)

        currentMessageGroup = [ message ]
      }

      lastMessage = message
    })

    if (currentMessageGroup && currentMessageGroup.length)
      messageGroups.push(currentMessageGroup)
    return messageGroups
  },

  render() {
    let { messages, auth } = this.state
    const messageGroups = this.groupMessages(messages)
    let chatApp
    if (!auth) {
      chatApp = <div className="chat">Logging In...</div>
    } else {
      chatApp = (
        <div className="chat">
          <header className="chat-header">
            <h1 className="chat-title">HipReact</h1>
            <p className="chat-message-count"># messages: {messages.length}</p>
          </header>
          <MessageGroups messageGroups={messageGroups} messages={messages}/>
          <MessageForm auth={auth}/>
        </div>
      )
    }
    return (
      chatApp
    )
  }
})

render(<Chat/>, document.getElementById('app'))
