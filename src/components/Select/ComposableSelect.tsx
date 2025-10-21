import { useEffect, useRef, useState } from "react";
import './ComposableSelect.css'

export type ComposableSelectItemType = "keyword" | "region";

/**
 * 
 * 나중에 검색 조건이 아래와 같이 만들어질 수 있을 것 같다
 * 
 * [
 *  {
 *    type: region
 *    value: "bjdCode"
 *  },
 *  {
 *    type: keyword
 *    value: "밥고 식당"
 *  }
 * ]    
 * 
 */
export type ComposableSelectItem = {
    type: ComposableSelectItemType;
    displayName: string;
    value: object;
}

export type Eupmyeondong = {
    displayName: string;
    name: string;
    code: string;
}

export type Sigungu = {
    displayName: string;
    name: string;
    code: string;
    eupmyeondongs: Eupmyeondong[];
}

export type Sido = {
    displayName: string;
    name: string;
    code: string;
    sigungus: Sigungu[];
}



export interface RegionSelectProps {
    readonly type: 'region';
    readonly findAllSidos: () => Sido[];
    readonly findAllSigungus: (selected: Sido) => Sigungu[];
    readonly findAllEupmyeondongs: (selected: Sigungu) => Eupmyeondong[];
    readonly onSelectedEupmyeondong?: (selected: Eupmyeondong) => void;
}


export interface KeywordSelectProps {
    readonly type: 'keyword';
    readonly displayeName: string // 사실 의미없는거 그냥 하나 넣어둔거
}

export interface ComposableSelectProps {
    readonly placeHolder?: string;
    readonly onChange?: (selectedItems: ComposableSelectItem[]) => void;
    readonly toggleDetailedConditionAreaOnOffRef?: () => void;
    readonly detailProps: RegionSelectProps | KeywordSelectProps
}


/**
 * 지역 선택 Select 입니다
 */
export function ComposableSelect(props: ComposableSelectProps) {


    /**
     * onChangeRef.current 의 값이 바뀐다고 하더라도 재렌더링이 되지 않기 위해서 useRef사용
     */
    const onChangeRef = useRef(props.onChange);
    useEffect(() => { onChangeRef.current = props.onChange; }, [props.onChange]);

    /**
     * ComposableSearch로 부터 toggleDetailedConditionAreaOnOffRef 함수를 주입받습니다
     */
    const toggleDetailedConditionAreaOnOffRef = useRef(props.toggleDetailedConditionAreaOnOffRef);
    useEffect(() => { toggleDetailedConditionAreaOnOffRef.current = props.toggleDetailedConditionAreaOnOffRef; }, [props.toggleDetailedConditionAreaOnOffRef]);

    /**
     * select 컴포넌트가 마우스 클릭되었을 때 발생하는 이벤트 함수입니다
     */
    const onClick = () => {
        toggleDetailedConditionAreaOnOffRef.current?.();
    }

    /**
     * 선택된 items 가 없을때 노출될 텍스트입니다
     */
    // const [placeHolder, setPlaceHolder] = useState<string>(props.placeHolder ?? "");
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * 현재 선택되어있는 items 입니다
     */
    const [selectedItems] = useState<ComposableSelectItem[]>([]);




    /**
     * selectedItems 의 값이 변경되었을 때 onChange() 를 호출합니다
     */
    useEffect(
        () => {
            onChangeRef.current?.(selectedItems);
        }, [selectedItems]
    )


    const LocationMarkerIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="3" />
        </svg>
    );



    return (
        <div className="composable-select-container">
            <div className="composable-select-head-icon" >
                <LocationMarkerIcon />
            </div>
            <button className="composable-select-trigger" onClick={onClick}>
                {props.placeHolder}
                <div>
                    화살표
                </div>
            </button>
        </div>
    )

}