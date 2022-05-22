import React, { Component } from 'react';
export default class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = { error: null };
    }
    componentDidCatch(error) {
        this.setState({ error });
    }
    render() {
        if (this.state.error) {
            return (React.createElement("pre", null,
                "Error - ",
                `${this.state.error}`));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=ErrorBoundary.js.map