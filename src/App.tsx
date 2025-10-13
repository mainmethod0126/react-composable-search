import './App.css'
import { ComposableSearch } from './components/ComposableSearch'

function App() {

  return (
    <>
      <div>
        <h1>react-composable-search</h1>
      </div>
      <div>
        <ComposableSearch
          selectors={createSelectors()}
        >
        </ComposableSearch>
      </div >
    </>
  )
}

export default App
