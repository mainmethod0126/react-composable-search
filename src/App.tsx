import './App.css'
import { ComposableSearch } from './components/ComposableSearch'
import type { ComposableSelectProps, RegionSelect } from './components/Select/ComposableSelect'

function App() {

  const createSelectorsProps = (): ComposableSelectProps[] => {

    const regionSelect = (): RegionSelect => {

    }


    return [
      {
        placeHolder: "테스트",

      }
    ]
  }

  return (
    <>
      <div>
        <h1>react-composable-search</h1>
      </div>
      <div>
        <ComposableSearch
          selectorsProps={createSelectorsProps()}
        >
        </ComposableSearch>
      </div >
    </>
  )
}

export default App
