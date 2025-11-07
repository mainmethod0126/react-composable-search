import { useRef, useState, type CSSProperties } from "react";
import { ComposableSelect } from "./Select/ComposableSelect";
import './ComposableSearch.css'
import type { RegionSelectProps } from "./Select/RegionSelect/RegionSelect";
import type { KeywordSelectProps } from "./Select/KeywordSelect";

export interface ComposableSearchProps {
    readonly selectorsProps?: ComposableSelectProps[];
    readonly className?: string;
    readonly style?: CSSProperties;
    readonly placeHolder?: string;
}


export type ComposableSelectProps = RegionSelectProps | KeywordSelectProps

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
            <>
                {
                    selectorsProps?.map((props) => {
                        if (props.type === 'region') {
                            return <ComposableSelect
                                {...props}
                                toggleDetailedConditionAreaOnOffRef={toggleDetailedConditionAreaOnOffRef.current}
                            ></ComposableSelect>
                        }
                        return <ComposableSelect
                            {...props}
                        ></ComposableSelect>
                    })
                }

            </>
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




