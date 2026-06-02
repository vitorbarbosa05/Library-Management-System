import type React from "react";
import type {ReactNode} from "react";

interface Props {
    classname?: string;
    children: ReactNode;
}

const ModuleWrapper: React.FC<Props> = ({classname, children}) => {
    return (
        <div
            className={`${classname} flex flex-1 min-h-0 flex-col max-w-screen-2xl gap-4 p-4 pt-0 mt-2 overflow-hidden`}>
            {" "}
            {children}
        </div>
    );
};
export default ModuleWrapper;