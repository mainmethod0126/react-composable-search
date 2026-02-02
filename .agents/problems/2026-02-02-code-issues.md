# 코드 문제점 분석

## 잘 되어있는 부분
- 검색 UI를 상단 선택 영역 / 상세 조건 영역 / 선택 결과 영역으로 분리해 구조가 명확함 (`src/components/ComposableSearch.tsx`).
- 지역 데이터 주입을 함수로 분리해 실제 API/데이터 소스 교체가 쉬움 (`src/components/Select/RegionSelect/RegionSelect.tsx`).
- 선택 조건을 칩으로 표시하고 개별/전체 삭제가 가능하도록 UX 흐름을 제공 (`src/components/SelectedConditionBasket/*`).

## 고쳐야 하는 부분
1. **빌드 불가 구문 오류**: `src/components/ComposableSearch.tsx`의 `onSelectedWholeRegionCondition` 내부에 `if (parent.)` 등 미완성 구문과 `filter` 콜백의 `return` 누락이 있어 TypeScript 파싱/컴파일이 실패함. (`src/components/ComposableSearch.tsx:52-70`)
2. **사용되지 않는 로직**: `onSelectedWholeRegionCondition`은 정의만 있고 호출되지 않음. 삭제하거나 완성 후 연결 필요. (`src/components/ComposableSearch.tsx`)
3. **리스트 key 누락**: `selectorsProps.map`과 `SelectedConditionBasket`의 칩 렌더링에 `key`가 없어 React 경고 및 diffing 이슈 발생 가능. (`src/components/ComposableSearch.tsx`, `src/components/SelectedConditionBasket/SelectedConditionBasket.tsx`)
4. **“전체 선택” 데이터 흐름 오류**: `SelectableRegionColumn`의 “현재 지역 전체” 체크가 부모(시/도) 데이터를 시/군/구 선택으로 전달해 `findAllEupmyeondongs`가 잘못된 코드로 호출됨. 결과적으로 목록이 비거나 동작이 불명확함. (`src/components/Select/RegionSelect/SelectableRegionColumn.tsx`, `src/components/Select/RegionSelect/RegionSelect.tsx`)
5. **onChange 미작동**: `RegionSelect`의 `selectedItems` 상태가 갱신되지 않아 `options.onChange`가 사실상 동작하지 않음. (`src/components/Select/RegionSelect/RegionSelect.tsx:150-170`)
6. **선택 조건 타입 혼합 위험**: `ComposableSelect`에서 `selectedConditions` 전체를 `SeletedRegionCondition[]`로 캐스팅해 전달함. 향후 키워드 조건이 추가되면 런타임 오류 가능. (`src/components/Select/ComposableSelect.tsx`, `src/components/Select/RegionSelect/RegionSelectConditionsArea.tsx`)
7. **디버그 로그 잔존**: `console.log`가 남아 있어 운영 시 노이즈 발생. (`src/components/Select/RegionSelect/SelectableRegionColumn.tsx`)
8. **샘플 데이터 형식 불일치**: 일부 코드 값 자릿수/형식이 다름(`44182031000`, `5Terms013010800`, `55011033000`). 조건 비교나 ID 기반 로직에서 혼선 가능. (`src/DemoService.tsx`)
9. **미사용/미구현 옵션**: `ComposableSearch`의 `placeHolder` prop 미사용, `KeywordSelect`는 입력/선택 상태가 없어 기능이 절반 구현 상태. TODO로 명시하거나 제거 필요. (`src/components/ComposableSearch.tsx`, `src/components/Select/KeywordSelect/KeywordSelect.tsx`)
