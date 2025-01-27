import "chart.js";

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    crosshair?: {
      line?: {
        color?: string; 
        width?: number; 
      };
      sync?: {
        enabled?: boolean; 
        group?: string; 
        suppressTooltips?: boolean; 
      };
      zoom?: {
        enabled?: boolean; 
        zoomboxBackgroundColor?: string; 
        zoomboxBorderColor?: string; 
      };
      snap?: {
        enabled?: boolean; 
      };
      callbacks?: {
        beforeZoom?: (start: { x: number; y: number }, end: { x: number; y: number }) => boolean;
        afterZoom?: (start: { x: number; y: number }, end: { x: number; y: number }) => void;
        afterDraw?:(chart:Chart) => void;     
      };
    };
  }
}