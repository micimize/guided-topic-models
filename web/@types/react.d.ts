import * as React from 'react';

declare module 'react' {
  export interface HTMLAttributes<T> {
    styleName?: string;
  }
}