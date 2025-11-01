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
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="3" />
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