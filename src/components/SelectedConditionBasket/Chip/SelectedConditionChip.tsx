// 위에서 작성한 CSS 파일을 임포트합니다.
import './SelectedConditionChip.css';
import type { SelectedCondition } from '../../ComposableSearch';

export type SelectedConditionChipProps = {
    readonly displayName: string,
    readonly conditionId?: string,
    readonly condition?: SelectedCondition
    readonly onDeleted?: (displayName: string, conditionId: string) => void
}

export function SelectedConditionChip(props: SelectedConditionChipProps) {

    const handleDeleteClick = () => {
        console.log("칩 삭제")
    };

    return (
        <div
            className="selected-condition-chip"
            role="row"
        >
            <span className="selected-condition-chip__label">
                {props.displayName}
            </span>

            <button
                type="button"
                className="selected-condition-chip__delete-button"
                onClick={handleDeleteClick}
                aria-label={`${props.displayName} 조건 삭제`}
            >
                <svg
                    className="selected-condition-chip__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
}