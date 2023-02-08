
import { HashRouter, Route } from 'react-router-dom'
import Router from '@/router'
import Auth from '@/components/auth'

function App() {
  return <HashRouter>
    <Auth>
      <Router />
    </Auth>
  </HashRouter>
}

export default App