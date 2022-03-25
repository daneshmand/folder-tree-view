export class NodeModel {
    type: 'folder' | 'file' | 'unset' | null;
    name?: string;
    children?: NodeModel[];
    id: string;

    constructor(type: 'folder' | 'file' | 'unset' | null, id: string, options?: {
        name?: string
    }) {
        this.type = type;
        this.id = id;
        this.name = !!options && !!options.name ? options.name : 'Untitled';
    }
}

export class Node extends NodeModel {
    icon?: 'file' | 'folder' | 'unset';
    children?: Node[];
    isFocused: boolean;
    isEditing: boolean;
    index: number;
    parentId: string | null;

    constructor(type: 'folder' | 'file' | 'unset' | null, id: string, index: number, parentId: string | null, options?: {
        name?: string, children?: Node[], icon?: 'file' | 'folder' | 'unset', isFocused?: boolean,
        isEditing?: boolean
    }) {
        super(type, id, options);
        this.parentId = parentId;
        this.icon = !!options && !!options.icon ? options.icon : 'unset';
        this.isFocused = !!options && options.isFocused !== undefined ? options.isFocused : true;
        this.isEditing = !!options && options.isEditing !== undefined ? options.isEditing : true;
        this.index = index;
        this.children = !!options && !!Array.isArray(options.children) ? options.children : [];
    }

    nodeHasChildren(): boolean {
        return !!this.children && this.children.length > 0;
    }
}
