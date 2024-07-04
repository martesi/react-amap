/// <reference types="@uiw/react-amap-types" />

import { useImperativeHandle, forwardRef, useEffect } from 'react';
import { OverlayProps } from '@uiw/react-amap-map';
import { useMarker } from './useMarker';

export * from './useMarker';

export interface MarkerProps extends OverlayProps, AMap.MarkerEvents, AMap.MarkerOptions {
  /** 覆盖物是否可见 */
  visiable?: boolean;
  className?: string;
  children?: JSX.Element;
}

export const Marker = forwardRef<MarkerProps & { marker?: AMap.Marker }, MarkerProps>((props, ref) => {
  const { marker, MarkerPortal } = useMarker(props);
  useImperativeHandle(ref, () => ({ ...props, marker }), [marker]);
  useEffect(() => {
    console.log('Marker: created');
    return () => console.log('Marker: destroyed');
  }, []);
  return <MarkerPortal>{props.children}</MarkerPortal>;
});
