interface FlatNode {
   id: number;
   parentId?: number;
   name: string;
   level: number;
}

const flatNodeList: Array<FlatNode> = [
   {
      id: 55,
      name: 'Программирование',
      level: 1,
   },
   {
      id: 1,
      parentId: 55,
      name: 'Git уроки',
      level: 2,
   },
   {
      id: 3,
      parentId: 1,
      name: 'Git установка',
      level: 3,
   },
   {
      id: 5,
      parentId: 1,
      name: 'Git первый коммит',
      level: 3,
   },
   {
      id: 6,
      parentId: 1,
      name: 'Github',
      level: 3,
   },
   {
      id: 404,
      name: 'Жизнь',
      level: 1,
   },
   {
      id: 500,
      parentId: 404,
      name: 'Когда нужно доверить задачу другому разрабу',
      level: 2,
   },
   {
      id: 7,
      parentId: 55,
      name: 'Angular NGRX',
      level: 2,
   },
   {
      id: 8,
      parentId: 7,
      name: 'Angular ngrx store',
      level: 3,
   },
   {
      id: 9,
      parentId: 7,
      name: 'Angular ngrx router',
      level: 3,
   },
   {
      id: 10,
      parentId: 7,
      name: 'Angular ngrx actions',
      level: 3,
   },
];

interface TreeNode {
   id: number;
   parentId?: number;
   name: string;
   level: number;
   parent?: TreeNode;
   children: Array<TreeNode>;
}

interface TreeCustomNode extends TreeNode {
   link: string;
   image: string;
   children: Array<TreeCustomNode>;
   parent?: TreeCustomNode;
}

class TreeCollection<T extends {
   id: number;
   parentId?: number;
   level: number;
   parent?: T;
   children?: Array<T>;
}> {
   private map: { [key: number]: T } = {};
   private collection: Array<T> = [];
   add(treeNode: T): TreeCollection<T> {
      this.map[treeNode.id] = treeNode;
      if (treeNode.level === 1) {
         this.collection.push(treeNode);
         return this;
      }

      if (treeNode.parentId && this.map[treeNode.parentId]) {
         this.map[treeNode.parentId].children.push(treeNode);
      }
      return this;
   }

   //    getMap(): { [key: number]: TreeNode } {
   //       return this.map;
   //    }
   remove(id: number) {
      const treeNode = this.map[id];
      if (!treeNode) {
         return;
      }

      if (treeNode.level === 1) {
         this.collection = this.collection.filter(node => node.id !== id);
         return;
      }

      if (!treeNode.parentId) {
         return;
      }

      const parentNode = this.map[treeNode.parentId];

      parentNode.children = parentNode.children.filter(node => node.id !== id);
   }

   getAll(): Array<T> {
      return this.collection;
   }
}

const treeCollection = flatNodeList
   .map<TreeNode>(flatNode => ({
      ...flatNode,
      children: [],
   }))
   .sort((a, b) => (a.level > b.level ? 1 : -1))
   .reduce<TreeCollection<TreeNode>>((treeCollection: TreeCollection<TreeNode>, item: TreeNode) => treeCollection.add(item), new TreeCollection<TreeNode>());

const foo = new TreeCollection<TreeCustomNode>()

treeCollection.remove(55);
console.log(treeCollection.getAll());
