import './App.css'
import { ComposableSearch, type ComposableSelectProps } from './components/ComposableSearch'
import type { KeywordSelectProps } from './components/Select/KeywordSelect'
import type { RegionSelectProps } from './components/Select/RegionSelect'

function App() {


  const createRegionSelectProps = (): RegionSelectProps => {
    return {
      options: {
        placeHolder: "지역 선택"
      },
      type: 'region',
      findAllSidos: () => {
        return []
      },
      findAllSigungus: () => {
        return []
      },
      findAllEupmyeondongs: () => {
        return []
      }
    }
  }

  const createKeywordSelectProps = (): KeywordSelectProps => {
    return {
      options: {
        placeHolder: "키워드 검색"
      },
      type: 'keyword',
    }
  }


  const createSelectorsProps = (): ComposableSelectProps[] => {
    return [
      createRegionSelectProps(),
      createKeywordSelectProps()
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
