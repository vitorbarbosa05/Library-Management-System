export function getPaginationItems(
    currentPageIndex: number,
    totalPages: number,
): Array<number | "ellipsis"> {
    if (totalPages <= 5) {
        return Array.from({length: totalPages}, (_, index) => index);
    }

    const items: Array<number | "ellipsis"> = [0];

    if (currentPageIndex > 2) items.push("ellipsis");

    const start = Math.max(1, currentPageIndex - 1);
    const end = Math.min(totalPages - 2, currentPageIndex + 1);

    for (let index = start; index <= end; index += 1) {
        items.push(index)
    }

    if (currentPageIndex < totalPages - 3) items.push("ellipsis");

    items.push(totalPages - 1);
    return items;
}