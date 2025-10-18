import { useEffect, useRef, useState } from "react";
import type { ComposableSelectProps } from "./Select/ComposableSelect";

export interface ComposableSearchProps {
    selectorsProps: ComposableSelectProps
}



export function ComposableSearch({ selectorsProps }: ComposableSearchProps) {

    /**
     * ConditionArea 가 열려있는 상태인지 확인합니다
     */
    const [isOpenConditionArea, setIsOpenConditionArea] = useState<boolean>(false);

    /**
     * ConditionArea 를 열거나 닫습니다
     */
    const toggleConditionAreaOnOffRef = useRef(() => {
        setIsOpenConditionArea((prev) => {
            return !prev
        })
    });



    return (<div>
        {renderSelect(selectors)}
    </div>);
}




