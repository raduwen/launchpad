import React from 'react'

class MidiDeviceSelector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <select onChange={this.handleChange} defaultValue="">
        <option value="" disabled>Please select a device...</option>
        {this.props.devices.map((device) => (
          <option value={device.id} key={device.id}>{device.manufacturer}:{device.name}</option>
        ))}
      </select>
    )
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }
}

export default MidiDeviceSelector
