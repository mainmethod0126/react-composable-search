// 파일명: demoService.ts
// React에 대한 의존성이 없는 순수 TypeScript 모듈입니다.

// 이 타입들은 실제 RegionSelect 컴포넌트가 있는 경로에서 가져옵니다.
import type { Region } from "./components/Select/RegionSelect/RegionSelect"

/**
 * 대한민국 시도 목록을 반환합니다.
 * (샘플 데이터)
 */
export const getSidos = (): Region[] => {
    return [
        {
            displayName: "서울특별시",
            name: "서울특별시",
            code: "1100000000", // 법정동 코드 (10자리)
        },
        {
            displayName: "부산광역시",
            name: "부산광역시",
            code: "2600000000",
        },
        {
            displayName: "경기도",
            name: "경기도",
            code: "4100000000",
        },
        {
            displayName: "제주특별자치도",
            name: "제주특별자치도",
            code: "5000000000",
        },
    ]
}

/**
 * 특정 시도(sidoCode)에 속한 시군구 목록을 반환합니다.
 * @param sidoCode 상위 시도의 10자리 법정동 코드
 */
export const getSigungus = (sidoCode: string): Region[] => {
    switch (sidoCode) {
        // 서울특별시 (1100000000)
        case "1100000000":
            return [
                { displayName: "종로구", name: "종로구", code: "1111000000" },
                { displayName: "강남구", name: "강남구", code: "1168000000" },
                { displayName: "마포구", name: "마포구", code: "1144000000" },
                { displayName: "관악구", name: "관악구", code: "1162000000" },
            ];
        // 부산광역시 (2600000000)
        case "2600000000":
            return [
                { displayName: "해운대구", name: "해운대구", code: "2635000000" },
                { displayName: "수영구", name: "수영구", code: "2650000000" },
                { displayName: "중구", name: "중구", code: "2611000000" },
                { displayName: "기장군", name: "기장군", code: "2671000000" }, // '군' 예시
            ];
        // 경기도 (4100000000)
        case "4100000000":
            return [
                // 참고: 수원시/성남시 등은 하위에 '구'가 있지만,
                // 여기서는 Sigungu 타입 레벨에서 '시'만 표현하는 것으로 가정합니다.
                // (이전 논의의 '일반구' 문제 참고)
                { displayName: "수원시", name: "수원시", code: "4111000000" },
                { displayName: "성남시", name: "성남시", code: "4113000000" },
                { displayName: "의왕시", name: "의왕시", code: "4143000000" }, // '구'가 없는 시
                { displayName: "과천시", name: "과천시", code: "4129000000" }, // '구'가 없는 시
                { displayName: "가평군", name: "가평군", code: "4182000000" }, // '군' 예시
            ];
        // 제주특별자치도 (5000000000)
        case "5000000000":
            return [
                { displayName: "제주시", name: "제주시", code: "5011000000" },
                { displayName: "서귀포시", name: "서귀포시", code: "5013000000" },
            ];
        default:
            // 선택된 sidoCode에 해당하는 데이터가 없으면 빈 배열 반환
            return [];
    }
};

/**
 * 특정 시군구(sigunguCode)에 속한 읍면동 목록을 반환합니다.
 * @param sigunguCode 상위 시군구의 10자리 법정동 코드
 */
export const getEupmyeondongs = (sigunguCode: string): Region[] => {
    switch (sigunguCode) {
        // 서울특별시 강남구 (1168000000)
        case "1168000000":
            return [
                { displayName: "역삼동", name: "역삼동", code: "1168010100" },
                { displayName: "개포동", name: "개포동", code: "1168010300" },
                { displayName: "청담동", name: "청담동", code: "1168010400" },
                { displayName: "삼성동", name: "삼성동", code: "1168010500" },
                { displayName: "대치동", name: "대치동", code: "1168010600" },
                { displayName: "신사동", name: "신사동", code: "1168010700" },
            ];
        // 부산광역시 해운대구 (2635000000)
        case "2635000000":
            return [
                { displayName: "우동", name: "우동", code: "2635010100" },
                { displayName: "좌동", name: "좌동", code: "2635010300" },
                { displayName: "중동", name: "중동", code: "2635010200" },
                { displayName: "송정동", name: "송정동", code: "2635010600" },
                { displayName: "반여동", name: "반여동", code: "2635010400" },
            ];
        // 부산광역시 기장군 (2671000000) - '읍/면' 예시
        case "2671000000":
            return [
                { displayName: "기장읍", name: "기장읍", code: "2671025000" },
                { displayName: "장안읍", name: "장안읍", code: "2671025300" },
                { displayName: "정관읍", name: "정관읍", code: "2671025600" },
                { displayName: "일광읍", name: "일광읍", code: "2671025900" },
                { displayName: "철마면", name: "철마면", code: "2671031000" },
            ];
        // 경기도 의왕시 (4143000000) - '구'가 없는 시의 예시
        case "4143000000":
            return [
                { displayName: "고천동", name: "고천동", code: "4143010100" },
                { displayName: "부곡동", name: "부곡동", code: "4143010200" },
                { displayName: "오전동", name: "오전동", code: "4143010300" },
                { displayName: "내손동", name: "내손동", code: "4143010400" },
                { displayName: "청계동", name: "청계동", code: "4143010500" },
            ];
        // 경기도 가평군 (4182000000) - '읍/면' 예시
        case "4182000000":
            return [
                { displayName: "가평읍", name: "가평읍", code: "4182025000" },
                { displayName: "설악면", name: "설악면", code: "44182031000" },
                { displayName: "청평면", name: "청평면", code: "4182032000" },
                { displayName: "상면", name: "상면", code: "4182033000" },
                { displayName: "조종면", name: "조종면", code: "4182034000" },
                { displayName: "북면", name: "북면", code: "4182035000" },
            ];
        // 제주특별자치도 제주시 (5011000000) - '읍/면/동'이 모두 있는 예시
        case "5011000000":
            return [
                { displayName: "한림읍", name: "한림읍", code: "5011025000" }, // 읍
                { displayName: "애월읍", name: "애월읍", code: "5011025300" }, // 읍
                { displayName: "구좌읍", name: "구좌읍", code: "5011025600" }, // 읍
                { displayName: "조천읍", name: "조천읍", code: "5011025900" }, // 읍
                { displayName: "한경면", name: "한경면", code: "5011031000" }, // 면
                { displayName: "추자면", name: "추자면", code: "5011032000" }, // 면
                { displayName: "우도면", name: "우도면", code: "55011033000" }, // 면
                { displayName: "이도일동", name: "이도일동", code: "5011010200" }, // 동
                { displayName: "삼도일동", name: "삼도일동", code: "5011010500" }, // 동
                { displayName: "아라동", name: "아라동", code: "5011012300" }, // 동
            ];
        // 제주특별자치도 서귀포시 (5013000000)
        case "5013000000":
            return [
                { displayName: "대정읍", name: "대정읍", code: "5013025000" }, // 읍
                { displayName: "남원읍", name: "남원읍", code: "5013025300" }, // 읍
                { displayName: "성산읍", name: "성산읍", code: "5013025900" }, // 읍
                { displayName: "안덕면", name: "안덕면", code: "5013031000" }, // 면
                { displayName: "표선면", name: "표선면", code: "5013032000" }, // 면
                { displayName: "송산동", name: "송산동", code: "5013010100" }, // 동
                { displayName: "천지동", name: "천지동", code: "5013010300" }, // 동
                { displayName: "대륜동", name: "대륜동", code: "5Terms013010800" }, // 동
            ];

        // '구'가 있는 시(예: 수원시)의 경우,
        // 현재 타입 모델(Sigungu -> Eupmyeondong)이 
        // 실제(Sigungu -> Gu -> Eupmyeondong)와 맞지 않아 처리가 복잡합니다.
        // 이 데모에서는 '구'가 없는 시/군/자치구만 명확히 처리합니다.
        case "4111000000": // 경기도 수원시
        case "4113000000": // 경기도 성남시
            return []; // 이 레벨에서는 '구'를 반환해야 하므로 읍면동은 비워둡니다.

        default:
            // 선택된 sigunguCode에 해당하는 데이터가 없으면 빈 배열 반환
            return [];
    }
}