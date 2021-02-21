import React, { Component } from 'react';
import backspace from './backspace.svg';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import * as math from 'mathjs';
import _ from 'lodash';

const symbols = {
  '+': '+',
  '-': '-',
  '÷': '/',
  '×': '*'
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      entry: '0',
      output: '',
      lastAction: '',
      hiddenEntry: ''
    }
  }

  handleClear = (button) => {
    let res = _.cloneDeep(this.state);
    switch (button) {
      case 'CE':
        res['entry'] = '0';
        res['hiddenEntry'] = '';
        res['lastAction'] = 'clearAll';
        if (res['value'] === '') {
          res['output'] = ''
        }
        break;
      case 'C':
        res['entry'] = '0';
        res['hiddenEntry'] = '';
        res['value'] = '';
        res['lastAction'] = 'clear';
        res['output'] = ''
        break;

      default:
        break;
    }
    this.setState(res)
  }

  handleOperators = (button) => {


    let res = _.cloneDeep(this.state)

    switch (res['lastAction']) {
      case 'dot':
        res['entry'] = res['entry'].slice(0, -1);
        res['output'] = res['output'] + res['entry'] + symbols[button]
        break;
      case 'operator':
        res['output'] = res['output'] + res['entry'] + symbols[button]
        break;
      case 'number':
        res['output'] = res['output'] + res['entry'] + symbols[button]
        break;
      default:
        res['output'] = res['entry'] + symbols[button]
        break;
    }
    res['lastAction'] = 'operator'
    res['hiddenEntry'] = symbols[button]
    res['value'] = res['value'] + ' ' + res['entry'] + ' ' + button;
    this.setState(res)
  }

  handleEqual = () => {


    let res = _.cloneDeep(this.state);
    switch (res['lastAction']) {

      case 'operator':
        res['hiddenEntry'] = res['entry']
        res['entry'] = math.eval(res['output'] + res['entry']).toString()
        break;

      case 'equal':
        res['entry'] = math.eval(res['entry'] + res['output'].slice(-1) + res['hiddenEntry']).toString()
        break;

      case 'number':
        res['hiddenEntry'] = res['entry']
        res['entry'] = math.eval(res['output'] + res['entry']).toString()
        break;

      default:
        break;
    }
    res['value'] = '';
    res['lastAction'] = 'equal';
    this.setState(res)

  }

  handleDot = () => {
    let res = _.cloneDeep(this.state);

    if (!res['entry'].includes('.')) {
      res['entry'] = res['entry'] + '.';
    }
    if (res['lastAction'] === 'operator') {
      res['entry'] = '0.'
    }

    res['lastAction'] = 'dot'
    this.setState(res)
  }

  handleBackspace = () => {
    let res = _.cloneDeep(this.state);

    switch (res['lastAction']) {
      case 'equal':
        res['entry'] = res['entry'].slice(0, -1)
        break;
      case 'operator':
        break;

      default:
        if (res['entry'].length === 1 || res['entry'] === '-0.'
          || (res['entry'].length === 2 && res['entry'].includes('-'))) {
          res['entry'] = '0'
        } else {
          res['entry'] = res['entry'].slice(0, -1)
        }
        break;
    }
    res['lastAction'] = 'backspace'
    this.setState(res)
  }

  handlePlusMinus = () => {
    let res = _.cloneDeep(this.state);
    if (this.state.entry === '0' || this.state.entry === '0.') {
      return null
    }
    if (res['entry'].includes('-')) {
      res['entry'] = res['entry'].substring(1)
    } else {
      res['entry'] = '-' + res['entry']
    }

    this.setState(res);
  }

  handleButtonClick = (button) => {
    let res = _.cloneDeep(this.state);

    if (res['entry'] === '0' || res['lastAction'] === 'equal') {
      res['entry'] = button
    } else {
      res['entry'] = res['entry'] + button
    }
    if (res['lastAction'] === 'operator') {
      res['entry'] = button
    }
    if (res['lastAction'] === 'equal') {
      res['output'] = ''
    }

    res['lastAction'] = 'number';
    this.setState(res);
  }
  componentDidUpdate() {
    for (let i in this.state) {
      console.log(i + ': ' + this.state[i])
    }


    console.log('________________________________________________________')
  }

  render() {
    return (
      <div className='calc-container'>
        <Input value={this.state.value} entry={this.state.entry}></Input>
        <Button handleButtonClick={this.handleClear}>CE</Button>
        <Button handleButtonClick={this.handleClear}>C</Button>
        <Button handleButtonClick={this.handleBackspace}>
          <img src={backspace} className='backspace' alt='backspace' />
        </Button>
        <Button handleButtonClick={this.handleOperators}>÷</Button>
        <Button handleButtonClick={this.handleButtonClick}>7</Button>
        <Button handleButtonClick={this.handleButtonClick}>8</Button>
        <Button handleButtonClick={this.handleButtonClick}>9</Button>
        <Button handleButtonClick={this.handleOperators}>×</Button>
        <Button handleButtonClick={this.handleButtonClick}>4</Button>
        <Button handleButtonClick={this.handleButtonClick}>5</Button>
        <Button handleButtonClick={this.handleButtonClick}>6</Button>
        <Button handleButtonClick={this.handleOperators}>-</Button>
        <Button handleButtonClick={this.handleButtonClick}>1</Button>
        <Button handleButtonClick={this.handleButtonClick}>2</Button>
        <Button handleButtonClick={this.handleButtonClick}>3</Button>
        <Button handleButtonClick={this.handleOperators}>+</Button>
        <Button handleButtonClick={this.handlePlusMinus}>±</Button>
        <Button handleButtonClick={this.handleButtonClick}>0</Button>
        <Button handleButtonClick={this.handleDot}>.</Button>
        <Button handleButtonClick={this.handleEqual}>=</Button>
      </div>
    );
  }
}

export default App;
