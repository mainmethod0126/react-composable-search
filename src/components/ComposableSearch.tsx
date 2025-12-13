import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ComposableSelect } from "./Select/ComposableSelect";
import './ComposableSearch.css'
import type { RegionSelectProps, SeletedRegionCondition } from "./Select/RegionSelect/RegionSelect";
import type { KeywordSelectProps } from "./Select/KeywordSelect/KeywordSelect";
import { SelectedConditionBasket } from "./SelectedConditionBasket/SelectedConditionBasket";

export interface ComposableSearchProps {
    readonly selectorsProps?: ComposableSelectProps[];
    readonly className?: string;
    readonly style?: CSSProperties;
    readonly placeHolder?: string;
}


export type SelectedCondition = {
    id: string,
    displayName: string
}


export type SeletedKeywordCondition = SelectedCondition & {}



export type ComposableSelectProps = RegionSelectProps | KeywordSelectProps

export function ComposableSearch({
    selectorsProps,
    className,
    style
}: ComposableSearchProps) {

    const [selectedConditions, setSelectedConditions] = useState<(SeletedRegionCondition | SeletedKeywordCondition)[]>([]);

    const onSelectedCondition = useCallback((selectedCondition: SeletedRegionCondition | SeletedKeywordCondition) => {

        setSelectedConditions(prev => {
            const exists = prev.some(c => c.id === selectedCondition.id);
            return exists
                ? prev.filter(c => c.id !== selectedCondition.id)
                : [...prev, selectedCondition];
        });
    }, [])


    const deleteCondition = useCallback((deleteConditionId: string) => {
        setSelectedConditions(prev => {
            return prev.filter(c => c.id !== deleteConditionId)
        });
    }, [])

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
                                setDetailedConditionsContent={setDetailedConditionsContent}
                                onSelectedCondition={onSelectedCondition}
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

    const [conditionsAreaNode, setConditionsAreaNode] = useState<ReactNode>(<p>Detailed Conditions area</p>);

    /**
     * Detailed Conditions area 의 내부를 채우는 용도
     */
    const setDetailedConditionsContent = useCallback((node: ReactNode) => {
        setConditionsAreaNode(node);
    }, []);

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
            <div className={`composable-search-detailed-conditions-area ${isOpenDetailedConditionArea ? 'is-open' : 'is-closed'}`}>
                {conditionsAreaNode}
            </div>
            <div className="composable-search-selected-conditions-area">
                <SelectedConditionBasket
                    conditions={selectedConditions}
                    onDeleted={deleteCondition}
                ></SelectedConditionBasket>
            </div>
        </div>
    );
}




