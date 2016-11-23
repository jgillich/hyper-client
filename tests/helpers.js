import Hyper from '../Hyper'

export function Client() {
  return new Hyper({
    socketPath: '/var/run/hyper.sock'
  })
}