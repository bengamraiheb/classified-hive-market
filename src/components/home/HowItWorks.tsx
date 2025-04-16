
import { Check, Clipboard, Search, Send } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Search",
    description: "Search for items or browse by category to find what you need."
  },
  {
    icon: <Send className="h-10 w-10 text-primary" />,
    title: "Connect",
    description: "Message sellers directly to ask questions or make offers."
  },
  {
    icon: <Check className="h-10 w-10 text-primary" />,
    title: "Purchase",
    description: "Meet locally or arrange for delivery to complete your purchase."
  },
  {
    icon: <Clipboard className="h-10 w-10 text-primary" />,
    title: "Sell",
    description: "List your own items for sale in just a few simple steps."
  }
];

export function HowItWorks() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            HiveMarket makes buying and selling locally simple, safe, and convenient.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full p-4 bg-primary/10 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
