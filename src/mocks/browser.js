import { worker } from './worker.js'
 

if (import.meta.env.MODE === 'development'){
  worker.start()
}
export { worker }