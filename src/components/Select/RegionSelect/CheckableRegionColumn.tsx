import './RegionColumn.css'
import type { Region } from './RegionSelect'
import type { OnSelectedRegion, RegionColumnItem, RegionColumnNode } from "./RegionSelectConditionsArea"

export type CheckableRegionColumnProps = {

    readonly title: string,
    readonly onCheckedRegion: OnSelectedRegion,
    readonly checkedRegions: Region[],
    readonly options?: {
        regionColumnNode?: RegionColumnNode
    }
}

export function CheckableRegionColumn(props: CheckableRegionColumnProps) {


    const getItemLabel = (item: RegionColumnItem) => item.displayName ?? item.name;

    // 체크 가능한 지역 목록에 부모 지역 전체 선택지도 포함시켜야함



    const isChecked = (region: Region) => {
        return props.checkedRegions.some((checkedRegion) => {
            return checkedRegion.code === region.code
        })
    }

    return (<div className="region-column-columnStyle" >
        <div className="region-column-titleStyle">{props.title}</div>
        <div className="region-column-listStyle">
            {regions.length === 0 ? (
                <span className="region-column-emptyStyle">No items to display.</span>
            ) : (
                regions.map((region) => (
                    <label key={region.code} className={`region-column-optionStyle`} >
                        <input type="checkbox"
                            checked={isChecked(region)}
                            onChange={() => {
                                props.onCheckedRegion(region);
                            }}
                        />
                        <span>{getItemLabel(region)}</span>
                    </label>
                ))
            )}
        </div>
    </div>)

}