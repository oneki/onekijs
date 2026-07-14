import { Property } from "csstype";
import { AnonymousObject } from "onekijs";
import { SizePropertyTheme, TLength, TshirtSize } from "onekijs-ui";
import React from "react";

export type ActionMenu<T extends AnonymousObject = {}> = React.FC<{
  items: ActionMenuItem<T>[];
  className?: string;
}>

export type ActionMenuList<T extends AnonymousObject = {}> = React.FC<{
  items: ActionMenuItem<T>[];
  onSelect: (title: string) => void;
}>

export type ActionMenuItem<T extends AnonymousObject = {}> = React.FC<T> & {
  title: string;
  size?: TshirtSize;
  width?: TshirtSize | SizePropertyTheme | Property.Width<TLength>;
  height?: TshirtSize | SizePropertyTheme | Property.Height<TLength>;
};
