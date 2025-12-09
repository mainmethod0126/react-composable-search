export interface KeywordSelectProps {
    readonly type: 'keyword';
    readonly options?: {
        readonly onClick?: () => void;
        readonly placeHolder?: string;
    }
}


export function KeywordSelect(props: KeywordSelectProps) {


    const KeywordIcon = () => (
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
            {/* 돋보기 아이콘 경로: 원(검색 렌즈)과 선(손잡이) */}
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );


    return (
        <div className="composable-select-container">
            <div className="composable-select-head-icon" >
                <KeywordIcon />
            </div>
            <button className="composable-select-trigger" onClick={props.options?.onClick}>
                <div>
                    {props.options?.placeHolder}
                </div>
            </button>
        </div>
    )

}