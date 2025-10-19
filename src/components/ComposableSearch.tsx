import { useRef, useState, type CSSProperties } from "react";
import { ComposableSelect, type ComposableSelectProps } from "./Select/ComposableSelect";
import './ComposableSearch.css'

export interface ComposableSearchProps {
    readonly selectorsProps?: ComposableSelectProps
    readonly className?: string;
    readonly style?: CSSProperties;
}



export function ComposableSearch({
    selectorsProps,
    className,
    style
}: ComposableSearchProps) {

    /**
     * ConditionArea 가 열려있는 상태인지 확인합니다
     */
    const [isOpenDetailedConditionArea, setIsOpenDetailedConditionArea] = useState<boolean>(false);

    /**
     * ConditionArea 를 열거나 닫습니다
     */
    const toggleDetailedConditionAreaOnOffRef = useRef(() => {
        setIsOpenDetailedConditionArea((prev) => {
            return !prev
        })
    });

    /**
     * selector 들을 렌더링합니다
     */
    const renderSelectorsArea = () => {

        return (
            <ComposableSelect
                toggleDetailedConditionAreaOnOffRef={toggleDetailedConditionAreaOnOffRef.current}
            ></ComposableSelect>
        )


    }


    return (
        <div
            className={`composable-search-container ${className ?? ''}`}
            style={style}
        >
            <div className="composable-search-selectors-area">
                {
                    renderSelectorsArea()
                }
            </div>
            {isOpenDetailedConditionArea ?
                <div className="composable-search-detailed-conditions-area">
                    <p>Detailed Conditions area</p>
                </div> : null
            }
            <div className="composable-search-selected-conditions-area">
                <p>Selected Conditions area</p>
            </div>
        </div>
    );
}




