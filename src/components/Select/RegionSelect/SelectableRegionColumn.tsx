import { useEffect, useState } from "react";
import type { OnSelectedRegion, RegionColumnItem, RegionColumnNode } from "./RegionSelectConditionsArea";
import './RegionColumn.css'
import type { Region } from "./RegionSelect";




export type SelectableRegionColumnProps = {

    readonly title: string,
    readonly onSelectedRegion: OnSelectedRegion,
    readonly selectedRegions: Region[],
    readonly showWholeOption?: boolean,
    readonly isWholeSelected?: boolean,
    readonly forceAllSelected?: boolean,
    readonly onToggleWhole?: () => void,
    readonly isWholeDisabled?: boolean,
    readonly options?: {
        regionColumnNode?: RegionColumnNode
    }
}

export function SelectableRegionColumn(props: SelectableRegionColumnProps) {


    const [currentRegion, setCurrentRegion] = useState<RegionColumnItem | undefined>()

    const getItemLabel = (item: RegionColumnItem) => item.displayName ?? item.name;

    const regions: RegionColumnItem[] = [
        ...props.options?.regionColumnNode?.children ?? []
    ];

    const isCurrent = (region: RegionColumnItem) => {
        return currentRegion && currentRegion?.code === region.code;
    }

    const isSelected = (region: RegionColumnItem) => {
        if (props.forceAllSelected) {
            return true;
        }
        return props.selectedRegions.some((selectedRegion) => {
            return region.code === selectedRegion.code
        })
    }

    /**
     * Column 초기 선택은 첫 번째 자식, 없으면 parent를 사용합니다
     */
    useEffect(() => {
        const firstChild = props.options?.regionColumnNode?.children?.[0];
        if (firstChild) {
            setCurrentRegion(firstChild);
            props.onSelectedRegion(firstChild);
            return;
        }

        if (props.options?.regionColumnNode?.parent) {
            setCurrentRegion(props.options.regionColumnNode.parent);
            props.onSelectedRegion(props.options.regionColumnNode.parent);
        }
    }, [props.options?.regionColumnNode, props.onSelectedRegion]);

    return (
        <div className="region-column-columnStyle" >
            <div className="region-column-titleStyle">{props.title}</div>
            {props.showWholeOption ? (
                <label className={`region-column-optionStyle`} >
                    <input
                        type="checkbox"
                        checked={!!props.isWholeSelected}
                        disabled={props.isWholeDisabled}
                        onChange={() => {
                            props.onToggleWhole?.();
                        }}
                    />
                    <span> 현재 지역 전체 </span>
                </label>
            ) : null}
            <div className="region-column-listStyle">
                {regions.length === 0 ? (
                    <span className="region-column-emptyStyle">No items to display.</span>
                ) : (
                    regions.map((region) => (
                        <label key={region.code} className={`region-column-optionStyle ${isCurrent(region) ? 'current' : isSelected(region) ? 'selected' : ''}`} onClick={() => {
                            if (props.isWholeSelected) {
                                props.onToggleWhole?.();
                            }
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
