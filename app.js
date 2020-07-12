import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'

import MidiManager from './lib/midi_manager'

import MidiDeviceSelector from './components/MidiDeviceSelector'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { midi_manager: null }

    this.inputDeviceChanged = this.inputDeviceChanged.bind(this)
    this.outputDeviceChanged = this.outputDeviceChanged.bind(this)
  }

  render() {
    const midi_manager = this.state.midi_manager
    const inputs = midi_manager ? Array.from(midi_manager.access.inputs.values()) : []
    const outputs = midi_manager ? Array.from(midi_manager.access.outputs.values()) : []
    return (
      <>
        <button id="reset">reset</button>
        <MidiDeviceSelector devices={inputs} onChange={this.inputDeviceChanged}/>
        <MidiDeviceSelector devices={outputs} onChange={this.outputDeviceChanged}/>
        <hr />
      </>
    )
  }

  async componentDidMount() {
    const midi_manager = new MidiManager()
    await midi_manager.setup()

    this.setState({ midi_manager: midi_manager })
  }

  inputDeviceChanged(id) {
    this.state.midi_manager.setInputDevice(id)
  }

  outputDeviceChanged(id) {
    this.state.midi_manager.setOutputDevice(id)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})
