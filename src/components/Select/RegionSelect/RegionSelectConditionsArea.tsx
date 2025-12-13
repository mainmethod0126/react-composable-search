import type { Region } from "./RegionSelect";
import { CheckableRegionColumn } from "./CheckableRegionColumn";
import { SelectableRegionColumn } from "./SelectableRegionColumn";
import "./RegionColumn.css"
import { useCallback, useState } from "react";

export type RegionSelectConditionsAreaProps = {
    foundSidoNode?: RegionColumnNode;
    foundSigunguNode?: RegionColumnNode;
    foundEupmyeondongNode?: RegionColumnNode;

    onSelectedSido: (selectedSido: Region) => void
    onSelectedSigungu: (selectedSigungu: Region) => void
    onSelectedEupmyeondong: (selectedRegion: {
        selectedSido: Region,
        selectedSigungu: Region,
        selectedEupmyeondong: Region
    }) => void
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


export type SelectedRegionGroup = {
    sido: Region;
    sigungu?: Region;
    eupmyeondong?: Region
}


export function RegionSelectConditionsArea(props: RegionSelectConditionsAreaProps) {


    const [currentSido, setCurrentSido] = useState<Region>()
    const [currentSigungu, setCurrentSigungu] = useState<Region>()

    const [selectedRegionGroups, setSelectedRegionGroups] = useState<SelectedRegionGroup[]>([])



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

        setSelectedRegionGroups((prev) => {
            const targetIndex = prev.findIndex(
                (group) => group.eupmyeondong?.code === selectedEupmyeondong.code
            );

            if (targetIndex > -1) {
                // 이미 존재함 -> 해당 인덱스만 쏙 빼고 복사 (Splice)
                const next = [...prev];
                next.splice(targetIndex, 1);
                return next;
            } else {
                // 존재하지 않음 -> 배열 끝에 추가
                return [
                    ...prev,
                    {
                        sido: currentSido,
                        sigungu: currentSigungu,
                        eupmyeondong: selectedEupmyeondong,
                    },
                ];
            }
        });

        props.onSelectedEupmyeondong({
            selectedSido: currentSido,
            selectedSigungu: currentSigungu,
            selectedEupmyeondong: selectedEupmyeondong
        });

        // [최적화] setState 함수형 업데이트(prev => ...)를 사용했으므로 
        // selectedRegionGroups를 의존성 배열에서 뺄 수 있습니다.
    }, [props, currentSido, currentSigungu]);

    const getSelectedSidos = (): Region[] => {

        const selectedSidos: Region[] = []

        for (const selectedRegionGroup of selectedRegionGroups) {
            selectedSidos.push(selectedRegionGroup.sido);
        }

        return selectedSidos;
    }

    const getSelectedSigungus = (): Region[] => {

        const selectedSigungus: Region[] = []

        for (const selectedRegionGroup of selectedRegionGroups) {
            if (selectedRegionGroup.sigungu) {
                selectedSigungus.push(selectedRegionGroup.sigungu);
            }
        }

        return selectedSigungus;
    }

    const getSelectedEupmyeondongs = (): Region[] => {

        const selectedEupmyeondongs: Region[] = []

        for (const selectedRegionGroup of selectedRegionGroups) {
            if (selectedRegionGroup.eupmyeondong) {
                selectedEupmyeondongs.push(selectedRegionGroup.eupmyeondong);
            }
        }

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
