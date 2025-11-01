import './App.css'
import { ComposableSearch } from './components/ComposableSearch'
import type { ComposableSelectProps } from './components/Select/ComposableSelect'

function App() {

  const createSelectorsProps = (): ComposableSelectProps[] => {

    return [
      {
        options: {
          placeHolder: "지역 선택"
        },
        detailProps: {
          type: 'region',
          findAllEupmyeondongs: () => {
            return []
          },
          findAllSidos: () => {
            return []
          },
          findAllSigungus: () => {
            return []
          },
        }
      },
      {
        options: {
          placeHolder: "키워드 검색"
        },
        detailProps: {
          type: 'keyword',
          displayeName: "해삐"
        }
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
