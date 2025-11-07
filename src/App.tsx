import './App.css'
import { ComposableSearch, type ComposableSelectProps } from './components/ComposableSearch'
import type { KeywordSelectProps } from './components/Select/KeywordSelect'
import type { RegionSelectProps } from './components/Select/RegionSelect/RegionSelect'
import { getEupmyeondongs, getSidos, getSigungus } from './DemoService'

function App() {


  const createRegionSelectProps = (): RegionSelectProps => {
    return {
      options: {
        placeHolder: "지역 선택"
      },
      type: 'region',
      findAllSidos: () => {
        return getSidos()
      },
      findAllSigungus: (sidoCode: string) => {
        return getSigungus(sidoCode);
      },
      findAllEupmyeondongs: (sigunguCode: string) => {
        return getEupmyeondongs(sigunguCode);
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
