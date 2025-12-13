import type { SeletedKeywordCondition } from "../ComposableSearch"
import type { SeletedRegionCondition } from "../Select/RegionSelect/RegionSelect"
import { SelectedConditionChip } from "./Chip/SelectedConditionChip"



export type SelectedConditionBasketProps = {
    conditions: (SeletedRegionCondition | SeletedKeywordCondition)[]
    onDeleted?: (deleteCondition: SeletedRegionCondition | SeletedKeywordCondition) => void
}


export function SelectedConditionBasket(props: SelectedConditionBasketProps) {



    return (<>
        <p>Selected Conditions Basket</p>
        {props.conditions.map((condition) => {
            return <SelectedConditionChip
                displayName={condition.displayName}
            ></SelectedConditionChip>
        })}
    </>)
}