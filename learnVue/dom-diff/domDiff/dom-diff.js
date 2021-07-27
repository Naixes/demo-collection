/**
 * DOM DIFF会产生的几种情况
 * 1.属性如果变了 {type:"ATTRS",attrs:{class:"list-new"}}
 * 2.如果文本变了 {type:"TEXT",text:1}
 * 3.节点被删除 {type:"REMOVE",index:1}
 * 4.节点不一样 {type:"REPLACE",newNode:newNode}
 */
//深度优先遍历树上节点的索引
import { _ } from "./util.js";
let globalIndex = 0;
//打包的补丁包
let patchs = {};
function diff(oldTree, newTree) {
    dfswalk(oldTree, newTree, globalIndex);
    return patchs;
}
function dfswalk(oldTree, newTree, index) {
    //每一次循环的时候 都会产生一个补丁
    let currentPatchs = [];
    if(!newTree) {
        currentPatchs.push({
            type: 'REMOVE',
            index
        })
    }else if (_.isString(oldTree)) {
        if (_.isString(newTree) && oldTree !== newTree) {
            currentPatchs.push({
                type: "TEXT",
                text: newTree
                // index:
            })
        }
    } else if (oldTree.type == newTree.type) {
        //节点还是那个节点 比属性+内容
        diffProps(oldTree.props, newTree.props);
        diffChildren(oldTree.children, newTree.children);
    }
    if (currentPatchs.length > 0) {
        patchs[index] = currentPatchs;
    }
}
function diffProps() {
    
}
//实现深度优先遍历的关键过程
function diffChildren(oldChildren, newChildren) {
    oldChildren.forEach((child, idx) => {
        // 尾调用优化
        dfswalk(child, newChildren[idx], ++globalIndex);
    });
}
export {
    diff
}