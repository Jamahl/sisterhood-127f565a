import { useState } from "react";
import { Calendar, Droplets, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, addDays, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

interface CycleTrackerProps {
  onClose?: () => void;
}

const CycleTracker = ({ onClose }: CycleTrackerProps) => {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [loggedPeriods, setLoggedPeriods] = useState<Date[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const cycleLengthOptions = Array.from({ length: 21 }, (_, i) => i + 21); // 21-41 days
  const periodLengthOptions = Array.from({ length: 7 }, (_, i) => i + 3); // 3-9 days

  const generatePredictions = () => {
    if (!lastPeriodDate) return [];
    
    const predictions: { start: Date; end: Date }[] = [];
    let currentDate = lastPeriodDate;
    
    // Generate predictions for the next 12 months
    for (let i = 0; i < 13; i++) {
      const start = addDays(currentDate, i * cycleLength);
      const end = addDays(start, periodLength - 1);
      
      // Only include if within next 12 months
      if (differenceInDays(start, new Date()) <= 365) {
        predictions.push({ start, end });
      }
    }
    
    return predictions;
  };

  const predictions = generatePredictions();

  const handleLogPeriod = () => {
    const today = new Date();
    setLoggedPeriods([...loggedPeriods, today]);
    setLastPeriodDate(today);
  };

  const handleSave = () => {
    setShowPredictions(true);
  };

  return (
    <div className="space-y-6">
      {/* Last Period Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Droplets className="w-4 h-4 text-rose" />
          Last Period Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !lastPeriodDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {lastPeriodDate ? format(lastPeriodDate, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={lastPeriodDate}
              onSelect={setLastPeriodDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Cycle Length */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Average Cycle Length
        </label>
        <div className="flex flex-wrap gap-2">
          {cycleLengthOptions.map((days) => (
            <button
              key={days}
              onClick={() => setCycleLength(days)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                cycleLength === days
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {days}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">days between periods</p>
      </div>

      {/* Period Length */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Average Period Length
        </label>
        <div className="flex flex-wrap gap-2">
          {periodLengthOptions.map((days) => (
            <button
              key={days}
              onClick={() => setPeriodLength(days)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                periodLength === days
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {days}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">days of bleeding</p>
      </div>

      {/* Save Button */}
      {lastPeriodDate && !showPredictions && (
        <Button onClick={handleSave} className="w-full">
          <Check className="w-4 h-4 mr-2" />
          Save & See Predictions
        </Button>
      )}

      {/* Log Today's Period */}
      <Button 
        variant="outline" 
        onClick={handleLogPeriod}
        className="w-full border-rose/30 text-rose hover:bg-rose/10"
      >
        <Droplets className="w-4 h-4 mr-2" />
        Log Period Started Today
      </Button>

      {/* Predictions */}
      {showPredictions && predictions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Predicted Periods
          </h4>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
            {predictions.map((prediction, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl",
                  loggedPeriods.some(
                    (logged) => 
                      differenceInDays(logged, prediction.start) >= 0 && 
                      differenceInDays(logged, prediction.start) <= 3
                  )
                    ? "bg-rose/20 border border-rose/30"
                    : "bg-muted/50"
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {format(prediction.start, "MMM d")} - {format(prediction.end, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {differenceInDays(prediction.start, new Date()) <= 0
                      ? "Current or past"
                      : `In ${differenceInDays(prediction.start, new Date())} days`}
                  </p>
                </div>
                {loggedPeriods.some(
                  (logged) => 
                    differenceInDays(logged, prediction.start) >= 0 && 
                    differenceInDays(logged, prediction.start) <= 3
                ) && (
                  <span className="text-xs bg-rose text-white px-2 py-1 rounded-full">
                    Logged
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleTracker;
