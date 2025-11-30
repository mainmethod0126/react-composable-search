import { useEffect, useState } from "react";
import type { OnSelectedRegion, RegionColumnItem, RegionColumnNode } from "./RegionSelectConditionsArea";
import './RegionColumn.css'




export type SelectableRegionColumnProps = {

    readonly title: string,
    readonly onSelectedRegion: OnSelectedRegion,
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

    /**
     * Column 은 초기 아이템은 parent로 지정됩니다
     */
    useEffect(() => {
        if (props.options?.regionColumnNode?.parent) {
            setCurrentRegion(props.options.regionColumnNode.parent);
            props.onSelectedRegion(props.options.regionColumnNode.parent);
        }
    }, [props.options?.regionColumnNode]); // 의존성 배열에 parent 객체(혹은 ID)를 넣습니다.

    return (<div className="region-column-columnStyle" >
        <div className="region-column-titleStyle">{props.title}</div>
        <div className="region-column-listStyle">
            {regions.length === 0 ? (
                <span className="region-column-emptyStyle">No items to display.</span>
            ) : (
                regions.map((region) => (
                    <label key={region.code} className={`region-column-optionStyle ${isCurrent(region) ? 'current' : ''}`} onClick={() => {
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