import React from 'react';
const MyPage = ({ burnerComponents, assets, defaultAccount }) => {
    const { Page } = burnerComponents;
    return (React.createElement(Page, { title: "A-Cash Exchange" },
        /* React.createElement("div", null,
            "Account: ",
            defaultAccount),
        React.createElement("div", null,
            "Assets: ",
            assets.map((asset) => asset.name).join(', ')),
*/
        React.createElement("iframe", {
           src: "https://bigfoe313.github.io/ACashExchange/",
           id: "frame",
           width: "600",
           height: "500"
        })

    ));

};
export default MyPage;
//# sourceMappingURL=MyPage.js.map