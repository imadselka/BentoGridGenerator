import { Button } from "@/components/ui/button";
import { BentoItem } from "@/types/types";
import { XCircle } from "lucide-react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type Layouts = {
  lg: LayoutItem[];
  md?: LayoutItem[];
  sm?: LayoutItem[];
};

type GridLayoutProps = {
  layouts: Layouts;
  gap: number;
  isDense: boolean;
  history: {
    present: BentoItem[];
  };
  onLayoutChange: (layout: LayoutItem[]) => void;
  onRemoveItem: (id: string) => void;
};

const GridLayout = ({
  layouts,
  gap,
  isDense,
  history,
  onLayoutChange,
  onRemoveItem,
}: GridLayoutProps) => {
  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 768, sm: 0 }}
      cols={{ lg: 12, md: 8, sm: 4 }}
      rowHeight={100}
      width={1200}
      compactType={isDense ? "vertical" : null}
      preventCollision={!isDense}
      margin={[gap * 4, gap * 4]}
      onLayoutChange={(currentLayout) => onLayoutChange(currentLayout)}
    >
      {history.present.map((item) => (
        <div
          key={item.i}
          className="bg-secondary text-secondary-foreground overflow-hidden"
          style={{ borderRadius: `8px` }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold cursor-move">
                {item.title}
              </h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveItem(item.i)}
              >
                <XCircle className="w-6 h-6" />
              </Button>
            </div>
            <p className="flex-grow">{item.content}</p>
            <div className="mt-2 text-sm text-secondary-foreground/70">
              Size: {item.w}x{item.h}
            </div>
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
