import type React from "react";

interface Props {
    getValue: string | number;
    className?: string;
}

const DataTableColumnRow: React.FC<Props> = ({getValue, className}) => {
    return <div className={`${className}`}>{getValue}</div>;
};

export default DataTableColumnRow;