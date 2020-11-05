import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>Num：{this.props.value}</h1>
        <button onClick={this.props.add}>值+1</button>
        <button onClick={this.props.addNum}>值+5</button>
      </div>
    )
  }
}
function reducer(state = { num: 0 }, action) {
  if (action.type.indexOf("redux") === -1) {
    state = ActionFn[action.type](state, action);
    return { ...state }
  } else {
    return state;
  }
}
let store = createStore(reducer);
const ActionFn = {
  add: (state, action) => {
    state.num++;
    return state;
  },
  addNum: (state, action) => {
    state.num += action.num;
    return state;
  }
}
function mapStateToProps(state) {
  return {
    value: state.num
  }
}
function mapDispatchToProps(dispatch) {
  return {
    add: () => { dispatch({ type: 'add' }) },
    addNum: () => { dispatch({ type: 'addNum', num: 5 }) }
  }
}

const Ap = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Ap></Ap>
        </Provider>
      </div>
    )
  }
}

export default App;
