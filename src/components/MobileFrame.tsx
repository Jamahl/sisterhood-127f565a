import { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
}

const MobileFrame = ({ children }: MobileFrameProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-light via-cream to-blush-light flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] min-h-[844px] bg-background rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-foreground/10">
        {/* Status bar */}
        <div className="h-12 bg-background flex items-center justify-between px-8 pt-2">
          <span className="text-xs font-medium text-muted-foreground">9:41</span>
          <div className="w-32 h-6 bg-foreground/90 rounded-full" />
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-muted-foreground rounded-sm">
              <div className="w-3 h-1.5 bg-sage rounded-sm m-[1px]" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="h-[calc(844px-48px-34px)] overflow-y-auto overflow-x-hidden">
          {children}
        </div>
        
        {/* Home indicator */}
        <div className="h-[34px] flex items-center justify-center">
          <div className="w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
