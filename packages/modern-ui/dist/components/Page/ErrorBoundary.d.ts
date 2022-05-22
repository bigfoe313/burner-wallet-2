import { Component } from 'react';
export default class ErrorBoundary extends Component<{}, {
    error?: any;
}> {
    state: {
        error: null;
    };
    componentDidCatch(error: any): void;
    render(): {} | null | undefined;
}
