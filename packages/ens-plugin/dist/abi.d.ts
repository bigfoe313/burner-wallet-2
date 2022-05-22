export declare const registryInterface: {
    "constant": boolean;
    "inputs": {
        "name": string;
        "type": string;
    }[];
    "name": string;
    "outputs": {
        "name": string;
        "type": string;
    }[];
    "type": string;
}[];
export declare const resolverInterface: ({
    "constant": boolean;
    "inputs": {
        "name": string;
        "type": string;
    }[];
    "name": string;
    "outputs": {
        "name": string;
        "type": string;
    }[];
    "type": string;
    "payable"?: undefined;
} | {
    "constant": boolean;
    "inputs": {
        "name": string;
        "type": string;
    }[];
    "name": string;
    "outputs": {
        "name": string;
        "type": string;
    }[];
    "payable": boolean;
    "type": string;
})[];
