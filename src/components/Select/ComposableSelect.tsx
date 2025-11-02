import { type ReactNode } from "react";
import './ComposableSelect.css'
import { RegionSelect, type RegionSelectProps } from "./RegionSelect";
import { KeywordSelect, type KeywordSelectProps } from "./KeywordSelect";

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





export type ComposableSelectProps = RegionSelectProps | KeywordSelectProps


/**
 * 지역 선택 Select 입니다
 */
export function ComposableSelect(props: ComposableSelectProps) {


    const render = (): ReactNode => {
        if (props.type === "region") {
            return <RegionSelect
                {...props}
            >
            </RegionSelect>
        } else if (props.type === "keyword") {
            return <KeywordSelect
                {...props}
            >
            </KeywordSelect>
        }

        return <></>
    }

    return (
        <>
            {render()}
        </>
    )
}