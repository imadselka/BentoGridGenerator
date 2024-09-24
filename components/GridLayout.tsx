"use client";

import { Button } from "@/components/ui/button";
import { BentoItem, LayoutItem, Layouts } from "@/types/types";
import { XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  layouts: Layouts;
  gap: number;
  isDense: boolean;
  borderRadius: number;
  items: BentoItem[];
  onLayoutChange: (layout: LayoutItem[]) => void;
  onRemoveItem: (id: string) => void;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  layouts,
  gap,
  isDense,
  borderRadius,
  items,
  onLayoutChange,
  onRemoveItem,
}) => {
  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  const renderItemContent = (item: BentoItem) => {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold cursor-move">{item.title}</h3>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemoveItem(item.i)}
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
        {item.image && (
          <div className="mb-2 relative h-40">
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        )}
        <p className="flex-grow">{item.content}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Learn More
          </a>
        )}
        {item.ingredients && (
          <div className="mt-2">
            <strong>Ingredients:</strong> {item.ingredients.join(", ")}
          </div>
        )}
        {item.cookingMethod && (
          <div className="mt-2">
            <strong>Cooking Method:</strong> {item.cookingMethod}
          </div>
        )}
        <div className="mt-2 text-sm text-secondary-foreground/70">
          Size: {item.w}x{item.h}
        </div>
      </div>
    );
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
      margin={[gap, gap]}
      onLayoutChange={(currentLayout) => onLayoutChange(currentLayout)}
    >
      {items.map((item) => (
        <div
          key={item.i}
          className="bg-secondary text-secondary-foreground overflow-hidden"
          style={{ borderRadius: `${borderRadius}px` }}
        >
          {renderItemContent(item)}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
