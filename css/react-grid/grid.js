import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "react-grid-layout": {
        "position": "relative",
        "transition": "height 200ms ease"
    },
    "react-grid-item": {
        "transition": "all 200ms ease",
        "transitionProperty": "left, top"
    },
    "react-grid-itemcssTransforms": {
        "transitionProperty": "transform"
    },
    "react-grid-itemresizing": {
        "zIndex": 1
    },
    "react-grid-itemreact-draggable-dragging": {
        "transition": "none",
        "zIndex": 3
    },
    "react-grid-itemreact-grid-placeholder": {
        "background": "gray",
        "opacity": 0.2,
        "transitionDuration": "100ms",
        "zIndex": 2,
        "WebkitUserSelect": "none",
        "MozUserSelect": "none",
        "MsUserSelect": "none",
        "OUserSelect": "none",
        "userSelect": "none"
    },
    "react-grid-item > react-resizable-handle": {
        "position": "absolute",
        "width": 20,
        "height": 20,
        "bottom": 0,
        "right": 0,
        "background": "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=')",
        "backgroundPosition": "bottom right",
        "paddingTop": 0,
        "paddingRight": 3,
        "paddingBottom": 3,
        "paddingLeft": 0,
        "backgroundRepeat": "no-repeat",
        "backgroundOrigin": "content-box",
        "boxSizing": "border-box",
        "cursor": "se-resize"
    }
});