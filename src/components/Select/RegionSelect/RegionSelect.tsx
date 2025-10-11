import type { ReactNode } from "react";
import type { ComposableSelect, ComposableSelectItem } from "../ComposableSelect";
import '../ComposableSelect.css';

/**
 * 지역 선택 Select 입니다
 */
export class RegionSelect implements ComposableSelect {

    placeHolder?: string;

    constructor(options: { placeHolder?: string }) {
        this.placeHolder = options?.placeHolder;
    }


    onChange = (selectedItems: ComposableSelectItem[]) => {
        console.log(selectedItems)
    };


    render(): ReactNode {
        return (
            <div className="composable-select-container">
                <div className="composable-select-head-icon">
                    icon
                </div>
                <div className="composable-select-trigger">
                    region select
                </div>
            </div>
        )
    }

}