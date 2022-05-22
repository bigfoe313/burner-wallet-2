function parseRequiredParams(path, config = null) {
    let _config = {
        erc681: {
            prefix: "pay",
            separators: ["@", "/"],
            keys: ["targetAddress", "chainId", "functionName"]
        },
        erc1328: {
            prefix: "wc",
            separators: ["@"],
            keys: ["sessionId", "version"]
        }
    };
    if (config && typeof config === "object") {
        _config = { ..._config, config };
    }
    let standard = Object.keys(_config).filter(key => path.startsWith(_config[key].prefix))[0] || "";
    if (!standard) {
        if (path.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi)) {
            standard = "erc1328";
        }
        else {
            standard = "erc681";
        }
    }
    const requiredParams = { prefix: _config[standard].prefix };
    path = path.replace(`${_config[standard].prefix}-`, "");
    const indexes = [];
    _config[standard].separators.reverse().forEach((separator, idx, arr) => {
        let fallback;
        if (idx === arr.length) {
            fallback = path.length;
        }
        else {
            fallback = indexes[0];
        }
        let index = path.indexOf(separator) && path.indexOf(separator) !== -1
            ? path.indexOf(separator)
            : fallback;
        indexes.unshift(index);
    });
    _config[standard].keys.forEach((key, idx, arr) => {
        let startIndex = idx !== 0 ? indexes[idx - 1] + 1 : 0;
        let endIndex = idx !== arr.length ? indexes[idx] : undefined;
        requiredParams[key] =
            idx !== 0 && indexes[idx - 1] === indexes[idx]
                ? ""
                : path.substring(startIndex, endIndex);
    });
    return requiredParams;
}
function parseQueryParams(queryString) {
    if (!queryString)
        return {};
    const result = {};
    const pairs = (queryString[0] === "?"
        ? queryString.substr(1)
        : queryString).split("&");
    for (let i = 0; i < pairs.length; i++) {
        const keyArr = pairs[i].match(/\w+(?==)/i) || [];
        const valueArr = pairs[i].match(/=.+/i) || [];
        if (keyArr[0]) {
            result[decodeURIComponent(keyArr[0])] = decodeURIComponent(valueArr[0].substr(1));
        }
    }
    return result;
}
function ethParseUri(uri) {
    if (!uri || typeof uri !== "string") {
        throw new Error("URI is not a string");
    }
    uri = decodeURIComponent(uri);
    const pathStart = uri.indexOf(":");
    const pathEnd = uri.indexOf("?") !== -1 ? uri.indexOf("?") : undefined;
    const protocol = uri.substring(0, pathStart);
    const path = uri.substring(pathStart + 1, pathEnd);
    const requiredParams = parseRequiredParams(path);
    const queryString = typeof pathEnd !== "undefined" ? uri.substr(pathEnd) : "";
    const queryParams = parseQueryParams(queryString);
    return { protocol, ...requiredParams, ...queryParams };
}
export default ethParseUri;
//# sourceMappingURL=eth-parse-uri.js.map