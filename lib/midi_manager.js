class MidiManager {
  constructor(){
  }

  async setup() {
    this.access = await navigator.requestMIDIAccess({ sysex: true })
    this.access.onstatechange = function(e) {
      console.log(e.port.name, e.port.manufacturer, e.port.state)
    }
  }

  setInputDevice(id) {
    const input = this.access.inputs.get(id)
    console.log(input)
    input.open()
  }

  async setOutputDevice(id) {
    const output = this.access.outputs.get(id)
    console.log(output)
    output.open()

    //----------------------------------------------------------------------------------------------------
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const ch = 0x90 // ch 1
    const note = 0xb
    const vel = 0x4


    // clear
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        output.send([ch, note + i + j * 10, 0])
      }
    }
    // fill
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        output.send([ch, note + i + j * 10, vel + (i + j * 10) % 4 * 8])
        await sleep(25)
      }
    }

    for (let k = 0; k < 3; k++) {
      // fill
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          output.send([ch, note + i + j * 10, vel])
        }
      }
      await sleep(200)

      // clear
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          output.send([ch, note + i + j * 10, 0])
        }
      }
      await sleep(200)
    }
  }
}

export default MidiManager
