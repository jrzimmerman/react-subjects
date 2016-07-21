////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time

import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      billingName: '',
      billingState: '',
      shippingName: '',
      shippingState: '',
      shippingIsBilling: false,
      shippingError: null,
      billingError: null
    }
  },

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input
                value={this.state.billingName}
                type="text"
                onChange={(event) => {
                  this.setState({
                    billingName: event.target.value
                  })
                }}
              />
              </label>
            </p>
            <p>
              <label>Billing State: <input
                value={this.state.billingState}
                type="text"
                size="2"
                onChange={(event) => {
                  if (event.target.value.length >= 3) {
                    this.setState({
                      billingError: true
                    })
                    setTimeout(() => {
                      this.setState({ billingError: null })
                    }, 1000)
                  } else {
                    this.setState({
                      billingState: event.target.value,
                      billingError: null
                    })
                  }
                }}
              />
              </label>
            </p>
            {this.state.billingError && <p className="hot"> Too many letters! </p>}
          </fieldset>

          <br/>

          <fieldset>
            <label><input
              value={this.state.shippingIsBilling}
              type="checkbox"
              onChange={(event) => {
                this.setState({
                  shippingIsBilling: event.target.checked
                })
              }}
            /> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input
                value={this.state.shippingIsBilling ? this.state.billingName : this.state.shippingName}
                type="text"
                onChange={(event) => {
                  this.setState({
                    shippingName: event.target.value
                  })
                }}
                readOnly={this.state.shippingIsBilling}
              />
              </label>
            </p>
            <p>
              <label>Shipping State: <input
                value={this.state.shippingIsBilling ? this.state.billingState : this.state.shippingState}
                type="text"
                size="2"
                onChange={(event) => {
                  if (event.target.value.length >= 3) {
                    this.setState({
                      shippingError: true
                    })
                    setTimeout(() => {
                      this.setState({ shippingError: null })
                    }, 1000)
                  } else {
                    this.setState({
                      shippingState: event.target.value,
                      shippingError: null
                    })
                  }
                }}
                readOnly={this.state.shippingIsBilling}
              />
              </label>
            </p>
            {this.state.shippingError && <p className="hot"> Too many letters! </p>}
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
