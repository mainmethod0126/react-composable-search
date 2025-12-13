import type { SeletedKeywordCondition } from "../ComposableSearch"
import type { SeletedRegionCondition } from "../Select/RegionSelect/RegionSelect"
import { SelectedConditionChip } from "./Chip/SelectedConditionChip"



export type SelectedConditionBasketProps = {
    conditions: (SeletedRegionCondition | SeletedKeywordCondition)[]
    onDeleted: (conditionId: string) => void
}


export function SelectedConditionBasket(props: SelectedConditionBasketProps) {

    return (<>
        <p>Selected Conditions Basket</p>
        {props.conditions.map((condition) => {
            return <SelectedConditionChip
                conditionId={condition.id}
                displayName={condition.displayName}
                onDeleted={props.onDeleted}
            ></SelectedConditionChip>
        })}
    </>)
}