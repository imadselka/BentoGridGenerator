import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";

type NewEmptyBoardDialogProps = {
  createNewEmptyLayout: (name: string) => void;
};

const NewEmptyBoardDialog = ({
  createNewEmptyLayout,
}: NewEmptyBoardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [layoutName, setLayoutName] = useState("");

  const handleCreate = () => {
    if (layoutName.trim()) {
      createNewEmptyLayout(layoutName);
      setLayoutName("");
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            New Empty Board
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create New Empty Board</DialogTitle>
          <DialogDescription>
            Enter a name for your new empty board.
          </DialogDescription>
          <Input
            type="text"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
            placeholder="Board Name"
            className="input input-bordered w-full"
          />
          <DialogFooter>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewEmptyBoardDialog;
