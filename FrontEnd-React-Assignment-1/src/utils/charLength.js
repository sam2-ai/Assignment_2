/* File: charLength.js located src/utils/ */
export const charLength = (data, min, max) => {
    if (data === null || data === undefined) return 0;
    const str = String(data).trim();
    if (typeof min !== "number" || typeof max !== "number" || min < 0 || max < min) {
        console.error("Invalid min or max values passed to charLength()");
        return 0;
    }
    const len = str.length;
    return len >= min && len <= max ? 1 : 0;
};
