import type { CSSProperties } from "react";
import type { Eupmyeondong, Sido, Sigungu } from "./RegionSelect";

export type RegionSelectConditionsAreaProps = {
    foundSidos: Sido[];
    foundSigungus?: Sigungu[];
    foundEupmyeondongs?: Eupmyeondong[];
}

type RegionItem = Sido | Sigungu | Eupmyeondong;

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

const getItemLabel = (item: RegionItem) => item.displayName ?? item.name;

const renderColumn = (title: string, items: RegionItem[]) => (
    <div style={columnStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={listStyle}>
            {items.length === 0 ? (
                <span style={emptyStyle}>No items to display.</span>
            ) : (
                items.map((item) => (
                    <label key={item.code} style={optionStyle}>
                        <input type="checkbox" />
                        <span>{getItemLabel(item)}</span>
                    </label>
                ))
            )}
        </div>
    </div>
);

export function RegionSelectConditionsArea(props: RegionSelectConditionsAreaProps) {
    const { foundSidos, foundSigungus, foundEupmyeondongs } = props;

    return (
        <section style={containerStyle}>
            {renderColumn("Sidos", foundSidos ?? [])}
            {renderColumn("Sigungu", foundSigungus ?? [])}
            {renderColumn("Eupmyeondong", foundEupmyeondongs ?? [])}
        </section>
    );
}
