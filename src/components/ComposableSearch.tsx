import { type CSSProperties } from "react";
import type { ComposableSelectProps } from "./Select/ComposableSelect";
import './ComposableSearch.css'

export interface ComposableSearchProps {
    readonly selectorsProps?: ComposableSelectProps
    readonly className?: string;
    readonly style?: CSSProperties;
}



export function ComposableSearch({
    // selectorsProps,
    className,
    style
}: ComposableSearchProps) {

    /**
     * ConditionArea 가 열려있는 상태인지 확인합니다
     */
    // const [isOpenConditionArea, setIsOpenConditionArea] = useState<boolean>(false);

    /**
     * ConditionArea 를 열거나 닫습니다
     */
    // const toggleConditionAreaOnOffRef = useRef(() => {
    //     setIsOpenConditionArea((prev) => {
    //         return !prev
    //     })
    // });


    return (
        <div
            className={`composable-search-container ${className ?? ''}`}
            style={style}
        >
            <div className="composable-search-selectors-area flex-center-content">
                <p>selectors area</p>
            </div>
            <div className="composable-search-detailed-conditions-area flex-center-content">
                <p>Detailed Conditions area</p>
            </div>
            <div className="composable-search-selected-conditions-area flex-center-content">
                <p>Selected Conditions area</p>
            </div>
        </div>
    );
}




