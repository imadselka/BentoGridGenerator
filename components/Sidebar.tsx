import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Layout } from "@/types/types";
import { Plus, Redo, Undo } from "lucide-react";
import LayoutPreviewCard from "./LayoutPreviewCard";

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
  createNewEmptyLayout: (name: string) => void;
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
  newLayoutName,
  setNewLayoutName,
  saveCurrentLayout,
  canUndo,
  canRedo,
  createNewEmptyLayout,
}: SidebarProps) => {
  return (
    <aside className="w-80 bg-background border-r p-4 overflow-y-auto flex flex-col space-y-6 fancy-scrollbar">
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
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              createNewEmptyLayout(`New Layout ${layouts.length + 1}`)
            }
          >
            <Plus className="w-4 h-4 mr-2" /> New Empty Layout
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Customize Grid</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="gap">Gap: {gap}</Label>
            <Slider
              id="gap"
              min={0}
              max={8}
              step={1}
              value={[gap]}
              onValueChange={(value) => setGap(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="border-radius">
              Border Radius: {borderRadius}px
            </Label>
            <Slider
              id="border-radius"
              min={0}
              max={24}
              step={1}
              value={[borderRadius]}
              onValueChange={(value) => setBorderRadius(value[0])}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="dense-mode"
              checked={isDense}
              onCheckedChange={setIsDense}
            />
            <Label htmlFor="dense-mode">Dense Mode</Label>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Actions</h2>
        <div className="flex flex-col space-y-2">
          <Button onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
          <Button onClick={undo} disabled={!canUndo}>
            <Undo className="w-4 h-4 mr-2" /> Undo
          </Button>
          <Button onClick={redo} disabled={!canRedo}>
            <Redo className="w-4 h-4 mr-2" /> Redo
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Save Layout</h2>
        <div className="flex flex-col space-y-2">
          <Input
            type="text"
            placeholder="Enter layout name"
            value={newLayoutName}
            onChange={(e) => setNewLayoutName(e.target.value)}
          />
          <Button
            onClick={saveCurrentLayout}
            disabled={newLayoutName.trim() === ""}
          >
            Save Layout
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
