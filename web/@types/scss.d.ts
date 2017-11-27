declare module '*.scss' {
  const content: any;
  export default content;
}
/*
declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}*/

import * as React from 'react';

declare module 'react' {
  export interface HTMLAttributes<T> {
    styleName?: string;
  }
}