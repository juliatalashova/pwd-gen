import React from 'react';

function Slider({ min, max, value, onChange }) {
  return <div className="slider-container">
    <span>Length</span>
    <input type="range" min={min} max={max} value={value} step="1" onChange={onChange} className="slider" />
    <span className="pwd-length">{value}</span>
  </div>

}
function Check({ label, name, id, checked, onChange, readonly = false }) {
  return <label htmlFor={id}>{label}
    <input type="checkbox" name={name} id={id} checked={checked} onChange={onChange} readOnly={readonly} />
    <span className="checkmark"></span>
  </label>
}

let password = function generate(options) {
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let lowercase = 'abcdefghijklmnopqrstuvwxyz'
  let numbers = '0123456789'
  let symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~'
  let all
  let password = ''
  if (options.withNumbers === true) {
    all = numbers;
  }
  if (options.withSymbols === true) {
    all += symbols;
  }
  if (options.withLowercase === true) {
    all += lowercase;
  }
  if (options.withUppercase === true) {
    all += uppercase;
  }
  for (let index = 0; index < options.length; index++) {
    let character = Math.floor(Math.random() * all.length)
    password += all.substring(character, character + 1)
  }
  return password

}
class Generator extends React.Component {
  state = {
    length: 6,
    pwd: '',
    withNumbers: true,
    withLowercase: false,
    withUppercase: false,
    withSymbols: false
  }

  setWithLowercase = (event) => {
    this.setState({withLowercase: event.target.checked})
  }
  setWithUppercase = (event) => {
    this.setState({withUppercase: event.target.checked})
  }
  setWithSymbols = (event) => {
    this.setState({withSymbols: event.target.checked})
  }

  setLength = (e) => {
    this.setState({ length: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  updateState = () => {
    this.setState({ pwd: password({...this.state}) });
  }

  render() {
    return (
      <div className="container">
        <form className="pwd-generation" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Generate a secure password</legend>
            <input type="text" name="output" className="result"
                 value={this.state.pwd}
                 onChange={this.updateState}
            />

            <Slider max="12" min="6"
                  value={this.state.length}
                  onChange={this.setLength}
            />

            <Check label="Numbers" id="numbers"
                 checked={this.state.withNumbers}
                 readonly={true}
            />
            <Check label="Lowercase" name="lowercase"
                 id="lowercase"
                 onChange={this.setWithLowercase}
                 checked={this.state.withLowercase}
            />
            <Check label="Uppercase" name="uppercase"
                 id="uppercase"
                 onChange={this.setWithUppercase}
                 checked={this.state.withUppercase}
            />
            <Check label="Symbols" name="symbols"
                 id="symbols"
                 onChange={this.setWithSymbols}
                 checked={this.state.withSymbols}
            />
            <button type="submit" onClick={this.updateState}>generate</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default Generator;
