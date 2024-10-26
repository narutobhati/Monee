import { Card } from "@repo/ui/card";

enum OnRampStatus {
  Success = "Success",
  Failure = "Failure",
  Processing = "Processing"
}

export function WalletTxn({
  transactions,
  title,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
  }[];
  title: string;
}) {
  if (!transactions.length) {
    return (
      <Card title={title}>
        <div className="text-center h-auto flex justify-center items-center pt-5">
          No recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title={title}>
      <div className="h-auto mt-2">
        {transactions.map((t, index) => (
          <div key={index} className="flex justify-between my-1">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-lg font-semibold">
                + Rs {t.amount / 100}
              </div>
              <div className={`text-xs font-semibold flex justify-center ${getStatusStyle(t.status)}`}>
                {t.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Helper function to determine the status text color
function getStatusStyle(status: OnRampStatus): string {
  switch (status) {
    case OnRampStatus.Success:
      return "text-green-600"; // Green for success
    case OnRampStatus.Failure:
      return "text-red-600"; // Red for failure
    case OnRampStatus.Processing:
      return "text-yellow-600"; // Yellow for processing
    default:
      return "";
  }
}
