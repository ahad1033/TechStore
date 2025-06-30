import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoadingButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Button>
        <Loader className="animate-spin" /> Submitting...
      </Button>
    </div>
  );
};
export default LoadingButton;
