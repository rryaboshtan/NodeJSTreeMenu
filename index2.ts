interface FlatNode {
   id: number;
   name: string;
   level: number;
}

const flatNodeList: Array<FlatNode> = [
   {
      id: 1,
      name: 'Git уроки',
      level: 1,
   },
   {
      id: 3,
      name: 'Git установка',
      level: 2,
   },
   {
      id: 5,
      name: 'Git первый коммит',
      level: 3,
   },
   {
      id: 6,
      name: 'GitHub',
      level: 3,
   },
   {
      id: 7,
      name: 'Angular NGRX',
      level: 2,
   },
   {
      id: 8,
      name: 'Angular ngrx store',
      level: 3,
   },
   {
      id: 9,
      name: 'Angular ngrx router',
      level: 1,
   },
   {
      id: 10,
      name: 'Angular ngrx actions',
      level: 2,
   },
];

interface TreeNode {
   id: number;
   name: string;
   level: number;
   parent?: TreeNode;
   children?: Array<TreeNode>;
}

const ROOT_LEVEL = 0;

const treeNodeList: Array<TreeNode> = flatNodeList
   .map<TreeNode>(flatNode => ({
      ...flatNode,
      children: [],
   }))
   .reduce(
      (acc: { [key: number]: TreeNode }, treeNode: TreeNode) => {
         //   if (treeNode.level === 1) {
         //      acc.push(treeNode);
         //   }
         //   if (treeNode.level === 2) {
         //      const parent = acc[acc.length - 1];
         //      treeNode.parent = parent;
         //      parent.children && parent.children.push(treeNode);
         //   }
         //    acc[0].children.push(treeNode);
         acc[treeNode.level] = treeNode;
         const parent = acc[treeNode.level - 1];
         if (parent.level !== ROOT_LEVEL) {
            treeNode.parent = parent;
         }
         treeNode.parent = parent;
         parent.children.push(treeNode);

         return acc;
      },
      {
         [ROOT_LEVEL]: {
            id: 0,
            name: 'root',
            level: ROOT_LEVEL,
            children: [],
         },
      }
   )[ROOT_LEVEL].children;

console.log(treeNodeList);
