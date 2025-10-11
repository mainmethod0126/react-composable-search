import type { ReactNode } from "react";
import type { ComposableSelect, ComposableSelectItem } from "../ComposableSelect";

/**
 * 지역 선택 Select 입니다
 */
export class RegionSelect implements ComposableSelect {



    onChange = (selectedItems: ComposableSelectItem[]) => {
        console.log(selectedItems)
    };


    render(): ReactNode {

        throw new Error("Method not implemented.");
    }



}