import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

type SaveLayoutProps = {
  newLayoutName: string;
  setNewLayoutName: (name: string) => void;
  saveCurrentLayout: () => void;
};

const SaveLayout = ({
  newLayoutName,
  setNewLayoutName,
  saveCurrentLayout,
}: SaveLayoutProps) => {
  return (
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
          <Save className="w-4 h-4 mr-2" /> Save Layout
        </Button>
      </div>
    </section>
  );
};

export default SaveLayout;
