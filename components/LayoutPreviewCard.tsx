import { Layout } from "@/types/types";

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
      {/* Displaying the grid preview based on layout items */}
      <div className="grid grid-cols-12 gap-1 h-24 overflow-hidden">
        {layout.items.map((item) => (
          <div
            key={item.i}
            className="bg-secondary"
            style={{
              gridColumn: `span ${item.w} / span ${item.w}`,
              gridRow: `span ${item.h} / span ${item.h}`,
            }}
          ></div>
        ))}
      </div>
    </button>
  );
};

export default LayoutPreviewCard;
