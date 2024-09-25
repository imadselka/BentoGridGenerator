import { Layout } from "@/types/types";
import { useEffect, useRef } from "react";

type LayoutPreviewCardProps = {
  layout: Layout;
  onClick: () => void;
  isSelected: boolean;
};

const LayoutPreviewCard = ({
  layout,
  onClick,
  isSelected,
}: LayoutPreviewCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cellWidth = canvas.width / 12;
        const cellHeight = canvas.height / 6;

        layout.items.forEach((item) => {
          ctx.fillStyle = isSelected
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(209, 213, 219, 0.5)";
          ctx.fillRect(
            item.x * cellWidth,
            item.y * cellHeight,
            item.w * cellWidth,
            item.h * cellHeight
          );
          ctx.strokeStyle = isSelected
            ? "rgb(59, 130, 246)"
            : "rgb(156, 163, 175)";
          ctx.strokeRect(
            item.x * cellWidth,
            item.y * cellHeight,
            item.w * cellWidth,
            item.h * cellHeight
          );
        });
      }
    }
  }, [layout, isSelected]);

  return (
    <button
      onClick={onClick}
      className={`p-4 border rounded-lg transition-all ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary"
      }`}
      aria-pressed={isSelected}
    >
      <h3 className="text-sm font-semibold mb-2">{layout.name}</h3>
      <canvas
        ref={canvasRef}
        width={120}
        height={60}
        className="w-full h-auto"
      />
    </button>
  );
};

export default LayoutPreviewCard;
