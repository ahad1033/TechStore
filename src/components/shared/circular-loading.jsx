import { Loader2 } from "lucide-react";

export default function CircularLoading() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  );
}
