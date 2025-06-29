import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoadingButton = (buttonName) => {
  return (
    <div className="flex items-center gap-2">
      <Button>
        <Loader className="animate-spin" /> {buttonName}
      </Button>
    </div>
  );
};
export default LoadingButton;
