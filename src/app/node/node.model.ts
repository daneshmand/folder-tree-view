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

  constructor(type: 'folder' | 'file' | 'unset' | null, id: string, index: number, options?: {
    name?: string, children?: Node[], icon?: 'file' | 'folder' | 'unset'
  }) {
    super(type, id, options);
    this.icon = !!options && !!options.icon ? options.icon : 'unset';
    this.isFocused = true;
    this.isEditing = true;
    this.index = index;
    this.children = !!options && !!Array.isArray(options.children) ? options.children : [];
  }
}