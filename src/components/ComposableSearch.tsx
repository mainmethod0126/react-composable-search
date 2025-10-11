import type { ReactNode } from "react";
import type { ComposableSelect } from "./Select/ComposableSelect";


type ComposableSearchProps = {
    selectors: ComposableSelect[];
}


export function ComposableSearch({ selectors }: ComposableSearchProps) {



    /**
     * select component 를 생성합니다
     * 
     * @param conditions 
     */
    const renderSelect = (selectors: ComposableSelect[]): ReactNode => {
        return (<div>
            {selectors.map(
                c => c.render()
            )}
        </div>);
    }




    return (<div>
        {renderSelect(selectors)}
    </div>);
}




