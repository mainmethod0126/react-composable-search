import type React from "react";
import type { ComposableSelectProps } from "./Select/ComposableSelect";
import type { ReactNode } from "react";

export interface ComposableSearchProps {
    selectorsProps: ComposableSelectProps
}



export function ComposableSearch({ selectorsProps }: ComposableSearchProps) {

    const renderSelect = (): ReactNode => {
        return (<div>

        </div>)
    }


    return (<div>
        {renderSelect(selectors)}
    </div>);
}




