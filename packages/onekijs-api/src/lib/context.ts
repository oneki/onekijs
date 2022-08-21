import { ReflectionFlags } from 'typedoc/dist/lib/serialization/schema';

export interface Description {
  name: string;
  description: string;
  example?: string;
  defaultValue?: string;
}
export interface Props extends Description {
  flags: ReflectionFlags;
  type: string;
  children?: Props[];
}
interface Context extends Description {
  props: Props[];
  returns?: Props;
  propsLevel: boolean;
}

export class ElementContext implements Context {
  props: Props[];
  returns?: Props;
  propsLevel: boolean;
  description: string;
  example?: string;
  defaultValue?: string;

  constructor(public name: string) {
    this.props = [];
    this.propsLevel = false;
    this.description = '';
  }

  appendActiveType = (type: string) => {
    const activeProp = this.getActiveProp();
    if (activeProp) {
      activeProp.type = `${activeProp.type}${type}`;
    }
  };

  getActiveProp() {
    const prop = this.props.at(-1);
    if (prop) {
      return this.getActiveChildrenProp(prop);
    }
    return prop;
  }

  private getActiveChildrenProp(prop: Props) {
    const children = prop?.children;
    if (children) {
      return children.at(-1);
    }
    return prop;
  }
}

export default ElementContext;
