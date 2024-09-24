import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share } from "lucide-react";

type HeaderProps = {
  exportTailwindCSS: () => string;
};

const Header = ({ exportTailwindCSS }: HeaderProps) => {
  return (
    <header className="bg-background p-4 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold">Bento Grid Generator</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
          >
            <Share className="w-4 h-4 mr-2" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Tailwind CSS Code</DialogTitle>
          </DialogHeader>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>{exportTailwindCSS()}</code>
          </pre>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
