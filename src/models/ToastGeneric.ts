export interface ToastGenericFC {
    title: string,
    content: string,
    type: 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Warning' | 'Info' | 'Light' | 'Dark',
    show: boolean
}