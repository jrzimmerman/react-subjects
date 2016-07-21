import React from 'react'
import { render } from 'react-dom'

const ContentToggle = React.createClass({
  propTypes: {
    summary: React.PropTypes.string.isRequired,
    children: React.PropTypes.node,
    onToggle: React.PropTypes.func
  },

  getInitialState() {
    return {
      isOpen: false
    }
  },

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen })

    if (this.props.onToggle) this.props.onToggle()
  },

  render() {
    let summaryClassName = 'ContentToggle__Summary'

    if (this.state.isOpen)
      summaryClassName += ' ContentToggle__Summary--is-open'

    return (
      <div className="ContentToggle">
        <button onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </button>
        {this.state.isOpen && (
          <div className="ContentToggle__Details">
            {this.props.children}
          </div>
        )}
      </div>
    )
  }

})

const App = React.createClass({
  getInitialState() {
    return {
      tacos: 0,
      burritos: 0
    }
  },

  handleToggle(whichOne) {
    this.setState({
      [whichOne]: this.state[whichOne] + 1
    })
  },

  render() {
    return (
      <div>
        <h6>Tacos: {this.state.tacos}</h6>
        <h6>Burritos: {this.state.burritos}</h6>
        <ContentToggle
          onToggle={() => this.handleToggle('tacos')}
          summary={`Tacos ${this.state.tacos}`}
        >
          <p>A taco is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling.</p>
        </ContentToggle>
        <ContentToggle
          onToggle={() => this.handleToggle('burritos')}
          summary={`Burritos ${this.state.burritos}`}
        >
          <p>A taco is a traditional Mexican dish composed of a wheat tortilla rolled around a filling.</p>
        </ContentToggle>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))



////////////////////////////////////////////////////////////////////////////////
// Let's encapsulate state in an object and call it what it really is. Then, add
// a setState function that we can use to update state and automatically update
// the page any time the state changes.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler, declared as a function in propTypes.

////////////////////////////////////////////////////////////////////////////////
// But we just got finished making <ContentToggle> generic, and now
// <ToggleTracker> is not! Can we make it generic as well? React.cloneElement
// can help us pass props to elements that weren't initially provided.
//
// Side note: Be careful to use the React.Children utility methods.
// this.props.children is opaque!

//const ContentToggle = React.createClass({
//
//  propTypes: {
//    title: React.PropTypes.string.isRequired,
//    onToggle: React.PropTypes.func,
//    children: React.PropTypes.node
//  },
//
//  getInitialState() {
//    return {
//      isOpen: false
//    }
//  },
//
//  handleClick() {
//    this.setState({
//      isOpen: !this.state.isOpen
//    })
//
//    if (this.props.onToggle)
//      this.props.onToggle()
//  },
//
//  render() {
//    let summaryClassName = 'ContentToggle__Summary'
//
//    if (this.state.isOpen)
//      summaryClassName += ' ContentToggle__Summary--is-open'
//
//    return (
//      <div className="ContentToggle">
//        <button onClick={this.handleClick} className={summaryClassName}>
//          {this.props.title}
//        </button>
//        {this.state.isOpen && (
//          <div className="ContentToggle__Details">
//            {this.props.children}
//          </div>
//        )}
//      </div>
//    )
//  }
//
//})
//
//const ToggleTracker = React.createClass({
//
//  getInitialState() {
//    return {
//      numToggles: 0
//    }
//  },
//
//  handleToggle() {
//    this.setState({
//      numToggles: this.state.numToggles + 1
//    })
//  },
//
//  render() {
//    let { children } = this.props
//
//    children = React.Children.map(children, (child) => (
//      React.cloneElement(child, {
//        onToggle: this.handleToggle
//      })
//    ))
//
//    return (
//      <div>
//        <pre>{JSON.stringify(this.state, null, 2)}</pre>
//        {children}
//      </div>
//    )
//  }
//
//})
//
//render((
//  <ToggleTracker>
//    <ContentToggle title="Tacos">
//      <p>A taco is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling.</p>
//    </ContentToggle>
//    <ContentToggle title="Burritos">
//      <p>A burrito is a type of Mexican and Tex-Mex food, consisting of a wheat flour tortilla wrapped or folded into a cylindrical shape to completely enclose the filling (in contrast to a taco, which is generally formed by simply folding a tortilla in half around a filling, leaving the semicircular perimeter open).</p>
//    </ContentToggle>
//  </ToggleTracker>
//), document.getElementById('app'))
