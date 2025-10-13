import { useState, type ReactNode } from "react";
import type { ComposableSelect, ComposableSelectItem } from "../ComposableSelect";
import '../ComposableSelect.css';

/**
 * 지역 선택 Select 입니다
 */
export function RegionSelect() {

    const placeHolder = useState<string>;
    const isOpen = useState<boolean>;


    constructor(options: { placeHolder?: string }) {
        this.placeHolder = options?.placeHolder;
    }


    LocationMarkerIcon = () => (
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

    onChange = (selectedItems: ComposableSelectItem[]) => {
        console.log(selectedItems)
    };


    render(): ReactNode {
        return (
            <div className="composable-select-container">
                <div className="composable-select-head-icon">
                    <this.LocationMarkerIcon />
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

}