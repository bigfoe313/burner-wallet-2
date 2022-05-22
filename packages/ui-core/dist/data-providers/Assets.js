import React, { Fragment } from 'react';
import { withBurner } from '../BurnerProvider';
const Assets = ({ render, assets }) => (React.createElement(Fragment, null, render(assets)));
export default withBurner(Assets);
//# sourceMappingURL=Assets.js.map