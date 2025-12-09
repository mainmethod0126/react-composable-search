import type { SeletedKeywordCondition, SeletedRegionCondition } from "../ComposableSearch"



export type SelectedConditionBasketProps = {
    conditions: (SeletedRegionCondition | SeletedKeywordCondition)[]
    onDeleted: (deleteCondition: SeletedRegionCondition | SeletedKeywordCondition) => void
}


export function SelectedConditionBasket(props: SelectedConditionBasketProps) {






    return (<></>)
}