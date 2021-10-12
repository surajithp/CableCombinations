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
  attributeName: string;
  attributeValue: AttributeValue;

  addChild(node: Node) {
    this.children = [...this.children, node];
    node.parent = this;
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
    return leaves
      .map((item) => item.variantName())
      .filter((item) => item.length > 0);
  }
}
