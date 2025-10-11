import './App.css'
import { ComposableSearch } from './components/ComposableSearch'
import type { ComposableSelect } from './components/Select/ComposableSelect'
import { RegionSelect } from './components/Select/RegionSelect/RegionSelect'



function App() {

  const createSelectors = (): ComposableSelect[] => {

    const selectors: ComposableSelect[] = [];

    const regionSelect = new RegionSelect();

    selectors.push(regionSelect);

    return selectors;

  }

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
