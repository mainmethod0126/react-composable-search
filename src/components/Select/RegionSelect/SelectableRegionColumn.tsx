import { useEffect, useState } from "react";
import type { OnSelectedRegion, RegionColumnItem, RegionColumnNode } from "./RegionSelectConditionsArea";
import './RegionColumn.css'
import type { Region } from "./RegionSelect";




export type SelectableRegionColumnProps = {

    readonly title: string,
    readonly onSelectedRegion: OnSelectedRegion,
    readonly selectedRegions: Region[],
    readonly options?: {
        regionColumnNode?: RegionColumnNode
    }
}

export function SelectableRegionColumn(props: SelectableRegionColumnProps) {


    const [currentRegion, setCurrentRegion] = useState<RegionColumnItem | undefined>()

    console.log("current : " + props.options?.regionColumnNode?.parent?.displayName)

    const getItemLabel = (item: RegionColumnItem) => item.displayName ?? item.name;

    // 체크 가능한 지역 목록에 부모 지역 전체 선택지도 포함시켜야함
    const regions: RegionColumnItem[] = [
        ...(props.options?.regionColumnNode?.parent ? [props.options?.regionColumnNode.parent] : []),
        ...props.options?.regionColumnNode?.children ?? []
    ];

    const isCurrent = (region: RegionColumnItem) => {
        return currentRegion && currentRegion?.code === region.code;
    }

    const isSelected = (region: RegionColumnItem) => {
        return props.selectedRegions.some((selectedRegion) => {
            return region.code === selectedRegion.code
        })
    }

    /**
     * 
     * 
     * @param regionColumnItem 
     */
    const onCheckedAllRegion = (regionColumnItem: RegionColumnItem) => {

    }

    /**
     * Column 은 초기 아이템은 parent로 지정됩니다
     */
    useEffect(() => {
        // 부모가 있을경우 부모를 초기 선택값으로 지정하고 부모가 없을 경우에는
        // 자식중에 첫번째를 선택합니다
        if (props.options?.regionColumnNode?.parent) {
            setCurrentRegion(props.options.regionColumnNode.parent);
            props.onSelectedRegion(props.options.regionColumnNode.parent)

        } else if (props.options?.regionColumnNode?.children?.[0]) {
            setCurrentRegion(props.options?.regionColumnNode?.children?.[0]);
            props.onSelectedRegion(props.options?.regionColumnNode?.children?.[0])
        }

    }, [props.options?.regionColumnNode]); // 의존성 배열에 parent 객체(혹은 ID)를 넣습니다.

    return (
        <div className="region-column-columnStyle" >
            <div className="region-column-titleStyle">{props.title}</div>
            <label className={`region-column-optionStyle`} >
                <input type="checkbox"
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                            if (props.options?.regionColumnNode?.parent) {
                                setCurrentRegion(props.options?.regionColumnNode?.parent)
                                props.onSelectedRegion(props.options?.regionColumnNode?.parent);
                            }
                        }
                    }}
                />
                <span> 현재 지역 전체 </span>
            </label>
            <div className="region-column-listStyle">
                {regions.length === 0 ? (
                    <span className="region-column-emptyStyle">No items to display.</span>
                ) : (
                    regions.map((region) => (
                        <label key={region.code} className={`region-column-optionStyle ${isCurrent(region) ? 'current' : isSelected(region) ? 'selected' : ''}`} onClick={() => {
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