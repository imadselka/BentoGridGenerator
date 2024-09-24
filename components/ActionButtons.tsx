import { Button } from "@/components/ui/button";
import { Plus, Redo, Undo } from "lucide-react";

type ActionButtonsProps = {
  addItem: () => void;
  undo: () => void;
  redo: () => void;
};

export const ActionButtons = ({ addItem, undo, redo }: ActionButtonsProps) => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Actions</h2>
      <div className="flex flex-col space-y-2">
        <Button onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
        <Button onClick={undo} disabled={false}>
          <Undo className="w-4 h-4 mr-2" /> Undo
        </Button>
        <Button onClick={redo} disabled={false}>
          <Redo className="w-4 h-4 mr-2" /> Redo
        </Button>
      </div>
    </section>
  );
};
