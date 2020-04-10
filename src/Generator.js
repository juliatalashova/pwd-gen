import React from 'react';


let UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
let NUMBERS = '0123456789'
let SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~'


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

function generate(options) {

  let all
  let password = ''
  if (options.withNumbers === true) {
    all = NUMBERS;
  }
  if (options.withSymbols === true) {
    all += SYMBOLS;
  }
  if (options.withLowercase === true) {
    all += LOWERCASE;
  }
  if (options.withUppercase === true) {
    all += UPPERCASE;
  }
  for (let index = 0; index < options.length; index++) {
    let character = Math.floor(Math.random() * all.length)
    password += all.slice(character, character + 1)
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
  setLength = (e) => {
    this.setState({ length: e.target.value });
  }

  updateState = () => {
    this.setState({ pwd: generate({...this.state}) });
  }
  onChange = (event) => {
    let {type} = event.target
    let value
    if (type === "checkbox") {
      value = event.target.checked
    }  else {
      value = event.target.value
    }

    this.setState({[event.target.name]: value})
  }
  render() {
    return (
      <div className="container">
        <form className="pwd-generation">
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
            <Check label="Lowercase" name="withLowercase"
                 id="lowercase"
                 onChange={this.onChange}
            />
            <Check label="Uppercase" name="withUppercase"
                 id="uppercase"
                 onChange={this.onChange}
            />
            <Check label="Symbols" name="withSymbols"
                 id="symbols"
                 onChange={this.onChange}
            />
            <button type="button" onClick={this.updateState}>generate</button>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default Generator;
