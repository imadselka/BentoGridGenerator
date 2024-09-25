import { Layout } from "@/types/types";
import { ActionButtons } from "./ActionButtons";
import GridCustomizer from "./GridCustomizer";
import LayoutPreviewCard from "./LayoutPreviewCard";
import NewEmptyBoardDialog from "./NewEmptyBoardDialog";
import SaveLayout from "./SaveLayout";
type SidebarProps = {
  layouts: Layout[];
  handleLayoutChange: (layoutName: string) => void;
  selectedLayout: string;
  gap: number;
  setGap: (gap: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  isDense: boolean;
  setIsDense: (dense: boolean) => void;
  addItem: () => void;
  undo: () => void;
  redo: () => void;
  newLayoutName: string;
  setNewLayoutName: (name: string) => void;
  saveCurrentLayout: () => void;
  canUndo: boolean;
  canRedo: boolean;
  createNewEmptyLayout: (name: string) => void; // New function for creating a new board
};

const Sidebar = ({
  layouts,
  handleLayoutChange,
  selectedLayout,
  gap,
  setGap,
  borderRadius,
  setBorderRadius,
  isDense,
  setIsDense,
  addItem,
  undo,
  redo,
  canUndo,
  canRedo,
  newLayoutName,
  setNewLayoutName,
  saveCurrentLayout,
  createNewEmptyLayout, // Destructure the new prop
}: SidebarProps) => {
  return (
    <aside className="w-80 bg-background border-r p-4 overflow-y-auto flex flex-col space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Choose a Layout</h2>
        <div className="grid grid-cols-1 gap-4">
          {layouts.map((layout) => (
            <LayoutPreviewCard
              key={layout.name}
              layout={layout}
              onClick={() => handleLayoutChange(layout.name)}
              isSelected={selectedLayout === layout.name}
            />
          ))}
        </div>
      </section>

      <GridCustomizer
        gap={gap}
        setGap={setGap}
        borderRadius={borderRadius}
        setBorderRadius={setBorderRadius}
        isDense={isDense}
        setIsDense={setIsDense}
      />

      <ActionButtons
        addItem={addItem}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <SaveLayout
        newLayoutName={newLayoutName}
        setNewLayoutName={setNewLayoutName}
        saveCurrentLayout={saveCurrentLayout}
      />

      <NewEmptyBoardDialog createNewEmptyLayout={createNewEmptyLayout} />
    </aside>
  );
};

export default Sidebar;
