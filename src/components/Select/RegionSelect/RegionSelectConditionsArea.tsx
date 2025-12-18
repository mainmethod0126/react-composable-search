import type { Region, SeletedRegionCondition } from "./RegionSelect";
import { CheckableRegionColumn } from "./CheckableRegionColumn";
import { SelectableRegionColumn } from "./SelectableRegionColumn";
import "./RegionColumn.css"
import { useCallback, useState } from "react";

export type RegionSelectConditionsAreaProps = {
    foundSidoNode?: RegionColumnNode;
    foundSigunguNode?: RegionColumnNode;
    foundEupmyeondongNode?: RegionColumnNode;

    selectedRegionConditions?: SeletedRegionCondition[];

    onSelectedSido: (selectedSido: Region) => void
    onSelectedSigungu: (selectedSigungu: Region) => void
    onSelectedEupmyeondong: (selectedRegion: {
        selectedSido: Region,
        selectedSigungu: Region,
        selectedEupmyeondong: Region
    }) => void
}

export type OnSelectedRegion = ((selectedSido: Region) => void) | ((selectedSigungu: Region) => void) | ((selectedEupmyeondong: Region) => void);

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


    const [currentSido, setCurrentSido] = useState<Region>()
    const [currentSigungu, setCurrentSigungu] = useState<Region>()



    const onSelectedSido = useCallback((selectedSido: Region) => {
        setCurrentSido(selectedSido)
        props.onSelectedSido(selectedSido);
    }, [props])

    const onSelectedSigungu = useCallback((selectedSigungu: Region) => {
        setCurrentSigungu(selectedSigungu)
        props.onSelectedSigungu(selectedSigungu);
    }, [props])

    const onSelectedEupmyeondong = useCallback((selectedEupmyeondong: Region) => {
        if (!currentSido || !currentSigungu) return;

        props.onSelectedEupmyeondong({
            selectedSido: currentSido,
            selectedSigungu: currentSigungu,
            selectedEupmyeondong: selectedEupmyeondong
        });

    }, [props, currentSido, currentSigungu]);

    const getSelectedSidos = (): Region[] => {

        const selectedSidos: Region[] = []

        props.selectedRegionConditions?.forEach((selectedRegionCondition) => {
            selectedSidos.push(selectedRegionCondition.sido);
        })

        return selectedSidos;
    }

    const getSelectedSigungus = (): Region[] => {

        const selectedSigungus: Region[] = []

        props.selectedRegionConditions?.forEach((selectedRegionCondition) => {
            selectedSigungus.push(selectedRegionCondition.sigungu);
        })

        return selectedSigungus;
    }

    const getSelectedEupmyeondongs = (): Region[] => {

        const selectedEupmyeondongs: Region[] = []

        props.selectedRegionConditions?.forEach((selectedRegionCondition) => {
            selectedEupmyeondongs.push(selectedRegionCondition.eupmyeondong);
        })

        return selectedEupmyeondongs;
    }



    const { foundSidoNode, foundSigunguNode, foundEupmyeondongNode } = props;

    return (
        <div className="region-column-containerStyle">
            <SelectableRegionColumn
                title="시/도"
                onSelectedRegion={onSelectedSido}
                selectedRegions={getSelectedSidos()}
                options={{
                    regionColumnNode: foundSidoNode
                }}
            ></SelectableRegionColumn>
            <SelectableRegionColumn
                title="시/군/구"
                onSelectedRegion={onSelectedSigungu}
                selectedRegions={getSelectedSigungus()}
                options={{
                    regionColumnNode: foundSigunguNode
                }}
            ></SelectableRegionColumn>
            <CheckableRegionColumn
                title="읍/면/동"
                onCheckedRegion={onSelectedEupmyeondong}
                checkedRegions={getSelectedEupmyeondongs()}
                options={{
                    regionColumnNode: foundEupmyeondongNode
                }}
            ></CheckableRegionColumn>
        </div>
    );
}
