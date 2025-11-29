import { useState } from "react"
import './RegionColumn.css'
import type { OnSelectedRegion, RegionColumnItem, RegionColumnNode } from "./RegionSelectConditionsArea"

export type CheckableRegionColumnProps = {

    readonly title: string,
    readonly onSelectedRegion: OnSelectedRegion,
    readonly options?: {
        regionColumnNode?: RegionColumnNode
    }
}

export function CheckableRegionColumn(props: CheckableRegionColumnProps) {

    // const [selectedRegions, setSelectedRegions] = useState<Region[]>
    const [currentRegion, setCurrentRegion] = useState<RegionColumnItem>()

    const getItemLabel = (item: RegionColumnItem) => item.displayName ?? item.name;

    // 체크 가능한 지역 목록에 부모 지역 전체 선택지도 포함시켜야함
    const regions: RegionColumnItem[] = [
        ...(props.options?.regionColumnNode?.parent ? [props.options?.regionColumnNode.parent] : []),
        ...props.options?.regionColumnNode?.children ?? []
    ];

    const isSelected = (region: RegionColumnItem) => {
        return currentRegion && currentRegion.code === region.code;
    }

    return (<div className="region-column-columnStyle" >
        <div className="region-column-titleStyle">{props.title}</div>
        <div className="region-column-listStyle">
            {regions.length === 0 ? (
                <span className="region-column-emptyStyle">No items to display.</span>
            ) : (
                regions.map((region) => (
                    <label key={region.code} className={`region-column-optionStyle ${isSelected(region) ? 'selected' : ''}`} >
                        <input type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    props.onSelectedRegion(region);
                                }
                            }}
                        />
                        <span>{getItemLabel(region)}</span>
                    </label>
                ))
            )}
        </div>
    </div>)

}