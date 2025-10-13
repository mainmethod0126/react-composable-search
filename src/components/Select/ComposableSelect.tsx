import { useEffect, useState, type ReactNode } from "react";


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

export interface ComposableSelectProps {
    placeHolder?: string;
    onChange?: (selectedItems: ComposableSelectItem[]) => void;
}


/**
 * 지역 선택 Select 입니다
 */
export function ComposableSelect(props: ComposableSelectProps) {


    const placeHolder = useState<string>;
    const isOpen = useState<boolean>;


    useEffect(
        () => {
        }, [])


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

    const onChange = (selectedItems: ComposableSelectItem[]) => {
        console.log(selectedItems)
    };


    return (
        <div className="composable-select-container">
            <div className="composable-select-head-icon">
                <LocationMarkerIcon />
            </div>
            <div className="composable-select-trigger">
                region select
                <div>
                    화살표
                </div>
            </div>
        </div>
    )

}