import type { Region } from "./RegionSelect";
import { CheckableRegionColumn } from "./CheckableRegionColumn";
import { SelectableRegionColumn } from "./SelectableRegionColumn";
import "./RegionColumn.css"
import { useCallback, useMemo } from "react";

export type RegionSelectConditionsAreaProps = {
    foundSidoNode?: RegionNode;
    foundSigunguNode?: RegionNode;
    foundEupmyeondongNode?: RegionNode;

    onSelectedSido: (selectedSido: Region) => void
    onSelectedSigungu: (selectedSigungu: Region) => void
    onSelectedEupmyeondong: (selectedEupmyeondong: Region) => void
}

export type OnSelectedRegion = ((selectedSido: Region) => void) | ((selectedSigungu: Region) => void) | ((selectedEupmyeondong: Region) => void);
// type RegionItem = Sido | Sigungu | Eupmyeondong;

/**
 * 자기자신을 포함합니다
 * 
 */
export type RegionColumnNode = {
    parent?: RegionColumnItem,
    children: RegionColumnItem[]
}

export type RegionColumnItem = {
    displayName: string;
    name: string;
    code: string;
    isSelected?: boolean;
    isCurrent?: boolean;
}


export function RegionSelectConditionsArea(props: RegionSelectConditionsAreaProps) {

    const [selectedSido, setSelectedSido]: Region | undefined = undefined
    const [selectedSigungu, setSelectedSigungu]: Region | undefined = undefined
    const [selectedEupmyeondong, : Region | undefined = undefined


    const onSelectedSido = useCallback((selectedSido: Region) => {
        props.onSelectedSido(selectedSido);
    }, [props])

    const onSelectedSigungu = (selectedSigungu: Region) => {
        props.onSelectedSigungu(selectedSigungu);
    }

    const onSelectedEupmyeondong = (selectedEupmyeondong: Region) => {
        props.onSelectedEupmyeondong(selectedEupmyeondong);
    }

    const { foundSidoNode, foundSigunguNode, foundEupmyeondongNode } = props;

    return (
        <div className="region-column-containerStyle">
            <SelectableRegionColumn
                title="시/도"
                onSelectedRegion={onSelectedSido}
                options={{
                    regionColumnNode: foundSidoNode
                }}
            ></SelectableRegionColumn>
            <SelectableRegionColumn
                title="시/군/구"
                onSelectedRegion={onSelectedSigungu}
                options={{
                    regionColumnNode: foundSigunguNode
                }}
            ></SelectableRegionColumn>
            <CheckableRegionColumn
                title="읍/면/동"
                onSelectedRegion={onSelectedEupmyeondong}
                options={{
                    regionColumnNode: foundEupmyeondongNode
                }}
            ></CheckableRegionColumn>
        </div>
    );
}
