import { useEffect, useRef, useState } from "react";
import type { ComposableSelectItem } from "../ComposableSelect";

export type Eupmyeondong = {
    displayName: string;
    name: string;
    code: string;
}

export type Sigungu = {
    displayName: string;
    name: string;
    code: string;
    // eupmyeondongs: Eupmyeondong[];
}

export type Sido = {
    displayName: string;
    name: string;
    code: string;
    // sigungus: Sigungu[];
}


// 실제 라이브러리 사용자가 외부에서 props를 주입할때 사용할 수 있는 용도입니다
// Omit된 속성은 라이브러리 내부에서 호출할때 주입용이라 사용자에게 표출하지 않도록 하였습니다
export type RegionSelectProps = Omit<RegionDefaultProps, 'toggleDetailedConditionAreaOnOffRef'>;

export type RegionDefaultProps = {
    readonly type: 'region';
    readonly findAllSidos: () => Sido[];
    readonly findAllSigungus: (sidoCode: string) => Sigungu[];
    readonly findAllEupmyeondongs: (sidoCode: string) => Eupmyeondong[];
    readonly toggleDetailedConditionAreaOnOffRef: () => void;

    readonly options?: {
        readonly onChange?: (selectedItems: ComposableSelectItem[]) => void;
        readonly onSelectedEupmyeondong?: (selected: Eupmyeondong) => void;
        readonly onClick?: () => void;
        readonly placeHolder?: string
    }
}

export function RegionSelect(props: RegionDefaultProps) {


    /**
     * onChangeRef.current 의 값이 바뀐다고 하더라도 재렌더링이 되지 않기 위해서 useRef사용
     */
    const onChangeRef = useRef(props.options?.onChange);
    useEffect(() => {
        if (props.options?.onChange) {
            onChangeRef.current = props.options.onChange;
        }


    }, [props.options?.onChange]);

    /**
     * ComposableSearch로 부터 toggleDetailedConditionAreaOnOffRef 함수를 주입받습니다
     */
    const toggleDetailedConditionAreaOnOffRef = useRef(props.toggleDetailedConditionAreaOnOffRef);
    useEffect(() => { toggleDetailedConditionAreaOnOffRef.current = props.toggleDetailedConditionAreaOnOffRef; }, [props.toggleDetailedConditionAreaOnOffRef]);

    /**
     * select 컴포넌트가 마우스 클릭되었을 때 발생하는 이벤트 함수입니다
     */
    const onClick = () => {
        toggleDetailedConditionAreaOnOffRef.current?.();
    }

    /**
     * 선택된 items 가 없을때 노출될 텍스트입니다
     */
    // const [placeHolder, setPlaceHolder] = useState<string>(props.placeHolder ?? "");
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * 현재 선택되어있는 items 입니다
     */
    const [selectedItems] = useState<ComposableSelectItem[]>([]);

    /**hsa
     * selectedItems 의 값이 변경되었을 때 onChange() 를 호출합니다
     */
    useEffect(
        () => {
            onChangeRef.current?.(selectedItems);
        }, [selectedItems]
    )



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
            <button className="composable-select-trigger" onClick={onClick}>
                <div>
                    {props.options?.placeHolder}
                </div>
            </button>
        </div>
    )
}