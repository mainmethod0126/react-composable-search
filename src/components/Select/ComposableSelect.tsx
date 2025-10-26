import { useEffect, useRef, useState } from "react";
import './ComposableSelect.css'
import type { RegionSelectProps } from "./RegionSelect";

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






    return (

    )

}