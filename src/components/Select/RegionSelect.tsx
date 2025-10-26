import { useEffect, useRef } from "react";

export type Eupmyeondong = {
    displayName: string;
    name: string;
    code: string;
}

export type Sigungu = {
    displayName: string;
    name: string;
    code: string;
    eupmyeondongs: Eupmyeondong[];
}

export type Sido = {
    displayName: string;
    name: string;
    code: string;
    sigungus: Sigungu[];
}

export interface RegionSelectProps {
    readonly type: 'region';
    readonly findAllSidos: () => Sido[];
    readonly findAllSigungus: (selected: Sido) => Sigungu[];
    readonly findAllEupmyeondongs: (selected: Sigungu) => Eupmyeondong[];
    readonly onSelectedEupmyeondong?: (selected: Eupmyeondong) => void;
    readonly onClick?: () => void;
    readonly placeHolder?: string;
}


export function RegionSelect(props: RegionSelectProps) {



    const LocationMarkerIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="3" />
        </svg>
    );


    return (
        <div className="composable-select-container">
            <div className="composable-select-head-icon" >
                <LocationMarkerIcon />
            </div>
            <button className="composable-select-trigger" onClick={props.onClick}>
                {props.placeHolder}
                <div>
                    화살표
                </div>
            </button>
        </div>
    )
}