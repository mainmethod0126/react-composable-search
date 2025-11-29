import { useState } from "react";
import type { OnSelectedRegion, RegionNode } from "./RegionSelectConditionsArea";
import type { Region } from "./RegionSelect";
import './RegionColumn.css'




export type SelectableRegionColumnProps = {

    readonly title: string,
    readonly onSelectedRegion: OnSelectedRegion,
    readonly options?: {
        regionNode?: RegionNode
    }
}

export function SelectableRegionColumn(props: SelectableRegionColumnProps) {


    // const [selectedRegions, setSelectedRegions] = useState<Region[]>
    const [currentRegion, setCurrentRegion] = useState<Region>()

    const getItemLabel = (item: Region) => item.displayName ?? item.name;

    // 체크 가능한 지역 목록에 부모 지역 전체 선택지도 포함시켜야함
    const regions: Region[] = [
        ...(props.options?.regionNode?.parent ? [props.options?.regionNode.parent] : []),
        ...props.options?.regionNode?.children ?? []
    ];

    const isSelected = (region: Region) => {
        return currentRegion && currentRegion.code === region.code;
    }

    return (<div className="region-column-columnStyle" >
        <div className="region-column-titleStyle">{props.title}</div>
        <div className="region-column-listStyle">
            {regions.length === 0 ? (
                <span className="region-column-emptyStyle">No items to display.</span>
            ) : (
                regions.map((region) => (
                    <label key={region.code} className={`region-column-optionStyle ${isSelected(region) ? 'selected' : ''}`} onClick={() => {
                        setCurrentRegion(region)
                        props.onSelectedRegion(region);
                    }}>
                        <span>{getItemLabel(region)}</span>
                    </label>
                ))
            )}
        </div>
    </div>)
}