/* eslint-env mocha */
import './modules/mocha-setup'
import React from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Simulate } from 'react-addons-test-utils'
import expect from 'expect'
import Tabs from './modules/Tabs'
import ContentToggle from './modules/ContentToggle'
import Droppable from './modules/Droppable'
import StatefulContentToggle from './modules/StatefulContentToggle'
import ContactList from '../Flux/solution/components/ContactList'

describe('Droppable',() => {
  it('accepts drops', () => {
    const el = <Droppable/>
    const div = document.createElement('div')
    render(el, div)
    Simulate.dragOver(div.children[0], {
      dataTransfer: { types: [ 'Files' ] }
    })
    document.body.appendChild(div)
    expect(div.innerHTML).toMatch(/Drop it/)
  })
})


// describe('StatefulContentToggle', () => {
//   it('opens and closes', () => {
//     const el = <StatefulContentToggle summary="test">i am open</StatefulContentToggle>
//     const div = document.createElement('div')
//     render(el, div)
//     expect(div.innerHTML).toNotMatch(/i am open/)
//     Simulate.click(div.querySelector('button'))
//     expect(div.innerHTML).toMatch(/i am open/)
//   })
// })


// describe('ContentToggle', () => {
//   it('renders the summary', () => {
//     const el = <ContentToggle summary="test"/>
//     const div = document.createElement('div')
//     render(el, div)
//     expect(div.innerHTML).toMatch(/test/)
//   })

//   it('renders the children when open', () => {
//     const el = <ContentToggle isOpen={true} summary="test">the children</ContentToggle>
//     const div = document.createElement('div')
//     const HTML = renderToString(el)
//     expect(HTML).toMatch(/the children/)
//   })
// })




//describe('ContentToggle', () => {
//  let div
//  beforeEach(() => div = document.createElement('div'))
//
//  it('displays the summary', () => {
//    render(<ContentToggle summary="test"/>, div)
//    expect(div.innerHTML).toMatch(/test/, '"test" was not found in HTML')
//  })
//
//  describe('isOpen prop', () => {
//    it('does not display children when false', () => {
//      render((
//        <ContentToggle isOpen={false} summary="">
//          <p>Cheers</p>
//        </ContentToggle>
//      ), div)
//
//      expect(div.innerHTML).toNotMatch(/Cheers/, '"Cheers" was found in HTML')
//    })
//
//    it('defaults to false', () => {
//      render((
//        <ContentToggle summary="">
//          <p>Cheers</p>
//        </ContentToggle>
//      ), div)
//
//      expect(div.innerHTML).toNotMatch(/Cheers/, '"Cheers" was found in HTML')
//    })
//
//    it('displays children when true', () => {
//      render((
//        <ContentToggle isOpen={true} summary="">
//          <p>Cheers</p>
//        </ContentToggle>
//      ), div)
//
//      expect(div.innerHTML).toMatch(/Cheers/, '"Cheers" was not found in HTML')
//    })
//  })
//})
//
//describe('StatefulContentToggle', () => {
//  let div
//  beforeEach(() => div = document.createElement('div'))
//
//  it('opens when clicked', () => {
//    render((
//      <StatefulContentToggle summary="test">
//        children
//      </StatefulContentToggle>
//    ), div)
//    Simulate.click(div.querySelector('button'))
//    expect(div.innerHTML).toMatch(/children/, '"children" was not found in HTML')
//  })
//})
//
//describe('Droppable', () => {
//  let div
//  beforeEach(() => {
//    div = document.createElement('div')
//    document.body.appendChild(div)
//  })
//
//  afterEach(() => document.body.removeChild(div))
//
//  it('accepts files', () => {
//    render(<Droppable/>, div)
//    Simulate.dragOver(div.querySelector('div.Droppable'), {
//      dataTransfer: { types: ['Files'] }
//    })
//    expect(div.innerHTML).toMatch(/Drop it!/, '"Drop it!" was not found in HTML')
//  })
//})
//
//describe('ContactList', () => {
//  let ActionStub, StoreStub, div
//
//  beforeEach(() => {
//    div = document.createElement('div')
//    ActionStub = { loadContacts(){}, deleteContact(){} }
//    StoreStub = { getState(){}, removeChangeListener(){}, addChangeListener(){} }
//  })
//
//  it('loads contacts when mounted', () => {
//    const loadContacts = expect.spyOn(ActionStub, 'loadContacts')
//
//    render(<ContactList
//      ViewActions={ActionStub}
//      StoreStub={StoreStub}
//    />, div)
//
//    expect(loadContacts).toHaveBeenCalled()
//  })
//})

// - render to a node that isn't in the dom
// - match innerHTML
// - renderToString
// - Simulate
// - actually render something
// - getDefaultProps for application modules
// - shallow renderer
// - assert on vdom
