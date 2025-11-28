import { type CSSProperties } from "react";
import type { Region } from "./RegionSelect";

export type RegionSelectConditionsAreaProps = {
    foundSidoNode?: RegionNode;
    foundSigunguNode?: RegionNode;
    foundEupmyeondongNode?: RegionNode;

    onSelectedSido: (selectedSido: Region) => void
    onSelectedSigungu: (selectedSigungu: Region) => void
    onSelectedEupmyeondong: (selectedEupmyeondong: Region) => void
}

type OnSelectedRegion = ((selectedSido: Region) => void) | ((selectedSigungu: Region) => void) | ((selectedEupmyeondong: Region) => void);
// type RegionItem = Sido | Sigungu | Eupmyeondong;

/**
 * 자기자신을 포함합니다
 * 
 */
export type RegionNode = {
    parent?: Region,
    children: Region[]
}


const containerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "1rem",
    width: "100%",
};

const columnStyle: CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "12px",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
};

const titleStyle: CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 600,
    marginBottom: "10px",
};

const listStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
    flex: 1,
};

const optionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    cursor: "pointer",
    color: "#000000",
};

const emptyStyle: CSSProperties = {
    fontSize: "0.85rem",
    color: "#a0aec0",
};

const getItemLabel = (item: Region) => item.displayName ?? item.name;


const renderColumn = (title: string, onSelectedRegion: OnSelectedRegion, regionNode?: RegionNode) => {

    // 체크 가능한 지역 목록에 부모 지역 전체 선택지도 포함시켜야함
    const regions: Region[] = [
        ...(regionNode?.parent ? [regionNode.parent] : []),
        ...regionNode?.children ?? []
    ];

    return <div style={columnStyle} >
        <div style={titleStyle}>{title}</div>
        <div style={listStyle}>
            {regions.length === 0 ? (
                <span style={emptyStyle}>No items to display.</span>
            ) : (
                regions.map((region) => (
                    <label key={region.code} style={optionStyle}>
                        <input type="checkbox"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    onSelectedRegion(region);
                                }
                            }}
                        />
                        <span>{getItemLabel(region)}</span>
                    </label>
                ))
            )}
        </div>
    </div>
}


export function RegionSelectConditionsArea(props: RegionSelectConditionsAreaProps) {

    const onSelectedSido = (selectedSido: Region) => {
        props.onSelectedSido(selectedSido);
    }

    const onSelectedSigungu = (selectedSigungu: Region) => {
        props.onSelectedSigungu(selectedSigungu);
    }

    const onSelectedEupmyeondong = (selectedEupmyeondong: Region) => {
        props.onSelectedEupmyeondong(selectedEupmyeondong);
    }


    const { foundSidoNode, foundSigunguNode, foundEupmyeondongNode } = props;


    return (
        <section style={containerStyle}>
            {renderColumn("시/도", onSelectedSido, foundSidoNode)}
            {renderColumn("시/군/구", onSelectedSigungu, foundSigunguNode)}
            {renderColumn("읍/면/동", onSelectedEupmyeondong, foundEupmyeondongNode)}
        </section>
    );
}
