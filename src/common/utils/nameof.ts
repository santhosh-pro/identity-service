interface NameofOptions {
    lastProp?: boolean;
}
function cleanseAssertionOperators(parsedName: string): string {
    return parsedName.replace(/[?!]/g, "");
}

export function nameof<T extends Object>(nameFunction: ((obj: T) => any) | { new(...params: any[]): T }, options?: NameofOptions): string {
    const fnStr = nameFunction.toString();

    if (
        fnStr.startsWith("class ")
        && !fnStr.startsWith("class =>")
    ) {
        return cleanseAssertionOperators(
            fnStr.substring(
                "class ".length,
                fnStr.indexOf(" {")
            )
        );
    }
    if (fnStr.includes("=>")) {
        return cleanseAssertionOperators(
            fnStr.substring(
                fnStr.indexOf(".") + 1
            )
        );
    }
    const matchRegex = /function\s*\(\w+\)\s*\{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;

    const es5Match = fnStr.match(matchRegex);

    if (es5Match) {
        return (options && options.lastProp)
            ? es5Match[3]
            : es5Match[1];
    }
    if (fnStr.startsWith("function ")) {
        return cleanseAssertionOperators(
            fnStr.substring(
                "function ".length,
                fnStr.indexOf("(")
            )
        );
    }

    // Invalid function.
    throw new Error("Invalid function.");
}