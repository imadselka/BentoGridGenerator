import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

type GridCustomizerProps = {
  gap: number;
  setGap: (gap: number) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  isDense: boolean;
  setIsDense: (dense: boolean) => void;
};

const GridCustomizer = ({
  gap,
  setGap,
  borderRadius,
  setBorderRadius,
  isDense,
  setIsDense,
}: GridCustomizerProps) => {
  return (
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
          <Label htmlFor="border-radius">Border Radius: {borderRadius}px</Label>
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
  );
};

export default GridCustomizer;
