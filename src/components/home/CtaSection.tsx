
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-4 max-w-2xl">
            Ready to turn your unused items into cash?
          </h2>
          <p className="text-lg mb-8 max-w-3xl opacity-90">
            Join thousands of people who buy and sell on HiveMarket every day. 
            It takes less than a minute to create your first listing.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/new-listing" className="px-8">
              Post Your First Ad
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
