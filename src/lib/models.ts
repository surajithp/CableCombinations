export class Product {
  name: string;
  attributes: Array<VariantAttribute>;
}

export class AttributeValue {
  name: string;
  active: boolean;
}

export class VariantAttribute {
  name: string;
  values: Array<AttributeValue>;
}

export class Node {
  children: Array<Node> = [];
  parent: Node;
  path: string
  attributeName: string;
  attributeValue: AttributeValue;
  leaves: Array<any> = []

  addChild(node: Node) {
    this.children = [...this.children, node];
    node.parent = this;
    if(node.parent && this.attributeValue){
      if(!node.parent.path){
        node.parent.path = node.parent.attributeValue
      }
      node.path = node.parent.path + "  |  " + node.attributeValue
    }
  }

  nameString() {
    return `${this.attributeName}:${this.attributeValue.name}`;
  }

  variantName() {
    let names = [this.nameString()];
    let temp = this.parent;
    let isActive = this.attributeValue.active;
    while (temp.parent) {
      names.push(temp.nameString());
      isActive = isActive && temp.attributeValue.active;
      temp = temp.parent;
    }
    if (isActive) {
      return names.reverse().join("  |  ");
    } else {
      return "";
    }
  }

  traverse(){
    let temp = [this];
    while (temp.length > 0) {
      let node = temp.pop();
      if (node.children.length === 0) {
          this.leaves.push(node.path)
      } else {
        temp.push(...node.children);
      }
    }
  }
  
}

export class VariantGenerator {
  generate(product: Product) {
    let root = new Node();
    root.children = [];
    let leaves = [root];
    for (let index = 0; index < product.attributes.length; index++) {
      const element = product.attributes[index];
      let newLeaves = [];
      leaves.forEach((item) => {
        let nodesToAdd = element.values.map((item) => {
          let n = new Node();
          n.attributeName = element.name;
          n.attributeValue = item;
          return n;
        });
        newLeaves = [...newLeaves, ...nodesToAdd];
        nodesToAdd.forEach((el) => item.addChild(el));
      });
      leaves = [...newLeaves];
    }
    root.traverse()
    console.log("====root children",root.children)
    return root.leaves
  }

  getRoot(product: Product) {
    let root = new Node();
    root.children = [];
    root.attributeName = "root"
    root.attributeValue = "root"
    let leaves = [root];
    for (let index = 0; index < product.attributes.length; index++) {
      const element = product.attributes[index];
      let newLeaves = [];
      leaves.forEach((item) => {
        let nodesToAdd = element.values.map((item) => {
          let n = new Node();
          n.attributeName = element.name;
          n.attributeValue = item;
          return n;
        });
        newLeaves = [...newLeaves, ...nodesToAdd];
        nodesToAdd.forEach((el) => item.addChild(el));
      });
      leaves = [...newLeaves];
    }
    return root
  }
}
