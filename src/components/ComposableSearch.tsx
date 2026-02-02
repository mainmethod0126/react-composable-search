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
            const isRegionCondition = (condition: SeletedRegionCondition | SeletedKeywordCondition): condition is SeletedRegionCondition => {
                return "sido" in condition && "sigungu" in condition && "eupmyeondong" in condition;
            };

            if (!isRegionCondition(selectedCondition)) {
                const exists = prev.some(c => c.id === selectedCondition.id);
                return exists
                    ? prev.filter(c => c.id !== selectedCondition.id)
                    : [...prev, selectedCondition];
            }

            const isWholeRegionCondition = (condition: SeletedRegionCondition) => {
                return condition.sigungu.code === condition.eupmyeondong.code;
            };

            const isSameSigungu = (condition: SeletedRegionCondition) => {
                return condition.sido.code === selectedCondition.sido.code
                    && condition.sigungu.code === selectedCondition.sigungu.code;
            };

            if (isWholeRegionCondition(selectedCondition)) {
                const filtered = prev.filter(condition => {
                    return !isRegionCondition(condition) || !isSameSigungu(condition);
                });
                const exists = prev.some(condition => isRegionCondition(condition) && condition.id === selectedCondition.id);
                return exists ? filtered : [...filtered, selectedCondition];
            }

            const withoutWhole = prev.filter(condition => {
                if (!isRegionCondition(condition)) {
                    return true;
                }
                if (!isSameSigungu(condition)) {
                    return true;
                }
                return !isWholeRegionCondition(condition);
            });

            const exists = withoutWhole.some(condition => condition.id === selectedCondition.id);
            return exists
                ? withoutWhole.filter(condition => condition.id !== selectedCondition.id)
                : [...withoutWhole, selectedCondition];
        });
    }, [])


    const deleteCondition = useCallback((deleteConditionId: string) => {
        setSelectedConditions(prev => {
            return prev.filter(c => c.id !== deleteConditionId)
        });
    }, [])

    const clearAllConditions = useCallback(() => {
        setSelectedConditions([]);
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
                                isDetailedConditionAreaOpen={isOpenDetailedConditionArea}
                                onSelectedCondition={onSelectedCondition}
                                selectedConditions={selectedConditions}
                            ></ComposableSelect>
                        }
                        return <ComposableSelect
                            {...props}
                            selectedConditions={selectedConditions}
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
                <div className="composable-search-selected-conditions-header">
                    <button
                        type="button"
                        className="composable-search-clear-button"
                        onClick={clearAllConditions}
                        disabled={selectedConditions.length === 0}
                    >
                        전체 삭제
                        <svg
                            className="composable-search-clear-button-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                    </button>
                </div>
                <div className="composable-search-selected-conditions-list">
                    <SelectedConditionBasket
                        conditions={selectedConditions}
                        onDeleted={deleteCondition}
                    ></SelectedConditionBasket>
                </div>
            </div>
        </div>
    );
}




